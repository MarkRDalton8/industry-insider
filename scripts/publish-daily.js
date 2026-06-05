#!/usr/bin/env node
// AI Daily Publisher — generates one new article per run, rotating through sections.
// Appends to lib/content.js, commits, and pushes so Vercel auto-deploys.
//
// Enable: set FEATURES.aiPublisher = true in lib/site.config.js
// Usage:  node scripts/publish-daily.js
// Env:    OPENWEBUI_API_KEY, OPENWEBUI_ENDPOINT, OPENWEBUI_MODEL (from .env)

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONTENT_FILE = path.join(__dirname, '../lib/content.js');
const STATE_FILE = path.join(__dirname, '.publish-state.json');
const CONFIG_FILE = path.join(__dirname, '../lib/site.config.js');

// --- CONFIGURE THESE PER SITE ---
// Section prompts tell the LLM what kind of content to generate per section.
// Keys must match SECTIONS[].slug in site.config.js.
const SECTION_PROMPTS = {
  news: 'general news and current events relevant to the publication audience.',
  opinion: 'commentary and analysis on topics relevant to the audience.',
  // Add more sections as needed
};

function readState() {
  if (!fs.existsSync(STATE_FILE)) return { lastSection: null, lastId: 0 };
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getSections() {
  return Object.keys(SECTION_PROMPTS);
}

function getNextSection(lastSection) {
  const sections = getSections();
  const idx = sections.indexOf(lastSection);
  return sections[(idx + 1) % sections.length];
}

function escapeForJs(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ');
}

async function generateArticle(section, id) {
  const endpoint = process.env.OPENWEBUI_ENDPOINT || 'https://llm.de-prod.cxense.com/';
  const model = process.env.OPENWEBUI_MODEL || 'us.anthropic.claude-opus-4-6-v1';
  const apiKey = process.env.OPENWEBUI_API_KEY;

  if (!apiKey) {
    console.error('ERROR: OPENWEBUI_API_KEY not set in .env');
    process.exit(1);
  }

  const prompt = `You are a journalist writing for a digital publication. Write a single news article about ${SECTION_PROMPTS[section]}

Return ONLY valid JSON (no markdown, no code fences) in this exact shape:
{
  "slug": "kebab-case-url-slug",
  "title": "Headline Here",
  "byline": "Reporter Name",
  "category": "Short Category",
  "excerpt": "One sentence summary.",
  "body": ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5"],
  "tags": ["${section}", "another-tag"],
  "locked": true
}

Make the headline compelling and specific. The body should be 5 well-written paragraphs. Set locked to true for ~70% of articles (premium content) and false for the rest.`;

  const res = await fetch(`${endpoint}api/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  return JSON.parse(content);
}

function appendArticle(article, section, id) {
  const dataContent = fs.readFileSync(CONTENT_FILE, 'utf8');
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const bodyLines = article.body
    .map(p => `      '${escapeForJs(p)}',`)
    .join('\n');

  const entry = `  {
    id: ${id},
    slug: '${escapeForJs(article.slug)}',
    section: '${section}',
    title: '${escapeForJs(article.title)}',
    byline: '${escapeForJs(article.byline)}',
    date: '${date}',
    category: '${escapeForJs(article.category)}',
    excerpt: '${escapeForJs(article.excerpt)}',
    body: [
${bodyLines}
    ],
    tags: [${(article.tags || [section]).map(t => `'${escapeForJs(t)}'`).join(', ')}],
    locked: ${article.locked !== false},
    featured: false,
  },`;

  const insertPoint = dataContent.lastIndexOf('];');
  if (insertPoint === -1) throw new Error('Could not find ARTICLES array end in content.js');

  const updated = dataContent.slice(0, insertPoint) + entry + '\n' + dataContent.slice(insertPoint);
  fs.writeFileSync(CONTENT_FILE, updated);
}

async function main() {
  console.log(`[${new Date().toISOString()}] Starting daily publish...`);

  const state = readState();
  const section = getNextSection(state.lastSection);
  const nextId = state.lastId + 1;

  console.log(`  Section: ${section}, Article ID: ${nextId}`);

  const article = await generateArticle(section, nextId);
  console.log(`  Generated: "${article.title}"`);

  appendArticle(article, section, nextId);
  writeState({ lastSection: section, lastId: nextId });

  // Git commit and push
  try {
    execSync('git add lib/content.js scripts/.publish-state.json', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
    execSync(`git commit -m "Daily publish [${section}]: ${article.title.slice(0, 60)}"`, { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
    execSync('git push', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
    console.log('  Committed and pushed.');
  } catch (err) {
    console.error('  Git push failed:', err.message);
  }

  console.log('  Done.');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
