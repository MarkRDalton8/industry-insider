# Piano Demo Site Scaffold Prompt

Copy this template, fill in the bracketed values, and paste into Claude Code in your new site directory.

---

## How to Use

```bash
# 1. Copy template to new directory
cp -r ~/code/piano-demo-template ~/code/[new-site-slug]
cd ~/code/[new-site-slug]
rm -rf .git node_modules .next

# 2. Open in VS Code, then paste the filled-in prompt below into Claude Code
```

---

## The Prompt (fill in brackets, then paste into Claude Code)

```
You are scaffolding a new Piano demo site from the piano-demo-template.

# Brand Brief
- Site name: [SITE NAME]
- Industry: [INDUSTRY]
- One-line description: [DESCRIPTION]
- Target subdomain: [slug].pianodemo.com
- Reference site (visual/content style): [URL]
- Tone: [adjectives — e.g., authoritative, conversational, data-driven]
- Primary color: [#hex]
- Dark color: [#hex]
- Body font: [Google Font name]
- Display/heading font: [Google Font name]
- Logo style: [text wordmark — e.g., bold all-caps "SITE NAME"]

# Sections
(Each becomes a nav item and URL prefix)
1. [slug] — [Label] — [#hex color] — "[tagline]" — image keywords: [k1,k2]
2. [slug] — [Label] — [#hex color] — "[tagline]" — image keywords: [k1,k2]
3. ...

# Special Content Types (beyond standard articles — set to "none" if not needed)
- [e.g., Studies — long-form PDF reports, always locked]
- [e.g., Trackers — data series, locked]
- [e.g., Newswire — press releases, never locked]

# Paywall Behavior
- Lock pattern: first [N] paragraphs visible, then Piano container
- Premium resource ID: [RESOURCE_ID or "PREMIUM"]
- Newsletter containers: [which sections get them, or "none"]

# Piano Configuration
- AID: [from Piano dashboard]
- Sandbox or production: [sandbox|production]
- Analytics site ID: [ID or "skip"]
- Analytics collectDomain: [domain or "skip"]
- ESP hash ID: [hash or "skip"]
- Default Offer ID: [ID or "skip"]

# Seed Content
Generate [N] articles per section.
Date range: [START DATE] to [END DATE].
Tone/voice: [describe — e.g., "AP style, uses named companies, statistics in headlines"]
Lock ratio: [e.g., 60% locked / 40% free]
Feature: [1 per section as featured hero]

# Tasks
1. Update `lib/site.config.js` — SITE, FONTS, COLORS, SECTIONS, PIANO, NAV values from brief above.
2. Update `app/globals.css` CSS variables to match visual identity.
3. Replace `lib/content.js` — generate all seed articles + any special content types.
4. Update Google Fonts link in site.config.js (`FONTS.googleFontsUrl`).
5. If special content types exist, create their page routes (e.g., `app/studies/[slug]/page.jsx`).
6. Update `package.json` name field to the kebab-case site slug.
7. Run `npm install` then `npm run build` — fix any errors.
8. Initialize git, create GitHub repo, and push:
   ```
   git init
   git add -A
   git commit -m "Initial [SITE NAME] scaffold from piano-demo-template"
   gh repo create MarkRDalton8/[repo-name] --public --source=. --push
   ```
9. Print this Piano Dashboard Checklist:
   - [ ] Create Composer experiences targeting `piano-container` (paywall) and `piano-subscribe` (registration)
   - [ ] Create the resource ID referenced in PIANO config (if not "skip")
   - [ ] Add production domain to Composer allowed domains
   - [ ] Configure Analytics site (if not "skip")
   - [ ] Configure ESP hash (if not "skip")
   - [ ] Create newsletter signup experiences for any section-specific containers
   - [ ] Connect Vercel project to the GitHub repo
   - [ ] Assign [slug].pianodemo.com domain in Vercel

Do NOT modify the standard components (PianoInit, Header, Footer, ArticleCard, ArticleContent,
SubscribeRibbon, PageViewTracker) — they are already parameterized via site.config.js.
Only modify them if a special content type requires a new page layout.
```

---

## Example: Filled-In Brief (FinServ / PYMNTS-style)

```
You are scaffolding a new Piano demo site from the piano-demo-template.

# Brand Brief
- Site name: FinServ Pulse
- Industry: B2B financial services / payments analyst media
- One-line description: Breaking news, data, and analysis on payments, banking, fintech, and the digital economy.
- Target subdomain: finserv.pianodemo.com
- Reference site: https://www.pymnts.com/
- Tone: authoritative, analyst-grade, data-led, uses named executives and companies in headlines, present-tense verbs, no exclamation marks
- Primary color: #E11D48
- Dark color: #0A0A0A
- Body font: Inter
- Display/heading font: Inter
- Logo style: text wordmark — bold all-caps "FINSERV PULSE"

# Sections
1. b2b — B2B Payments — #1E40AF — "Treasury, AR/AP, working capital, and the rails moving enterprise money." — image keywords: finance,office
2. banking — Banking — #047857 — "Earnings, deposits, regulation, and the institutions reshaping retail and commercial banking." — image keywords: bank,architecture
3. fintech — Fintech — #7C3AED — "Funding, platform launches, and the upstarts pressuring incumbents." — image keywords: technology,startup
4. crypto — Crypto & Stablecoins — #B45309 — "Digital assets, on-chain finance, and the regulators trying to catch up." — image keywords: cryptocurrency,blockchain
5. ai-payments — AI in Payments — #0891B2 — "Agentic checkout, fraud models, and how AI is rewriting the transaction." — image keywords: artificial-intelligence,data
6. regulation — Regulation — #475569 — "Policy, enforcement, and global rule-making across financial services." — image keywords: capitol,law

# Special Content Types
- Studies — quarterly long-form PDF reports, always locked. Route: /studies/[slug]
- Trackers — recurring data series with chart + summary, always locked. Route: /trackers/[slug]
- Newswire — short paid press releases, never locked, no byline. Route: /newswire/[slug]
- Opinion — named columnist "M. Renner", always free. Route: /opinion/[slug]

# Paywall Behavior
- Lock pattern: first 2 paragraphs visible, then Piano container
- Premium resource ID: FINSERV_PRO
- Newsletter containers: b2b, banking, fintech sections

# Piano Configuration
- AID: QiNgMM49pu
- Sandbox or production: production
- Analytics site ID: skip
- Analytics collectDomain: skip
- ESP hash ID: skip
- Default Offer ID: skip

# Seed Content
Generate 6 articles per section + 3 Studies + 3 Trackers + 4 Newswire + 2 Opinion columns.
Date range: April 1, 2026 to June 1, 2026.
Tone/voice: AP/analyst style, uses real company names (Visa, Stripe, JPMorgan, Klarna, etc.), statistics in headlines encouraged ("57% of SMBs..."), named executives.
Lock ratio: 70% locked / 30% free (premium feel).
Feature: 1 per section as featured hero.

# Tasks
1. Update `lib/site.config.js` — SITE, FONTS, COLORS, SECTIONS, PIANO, NAV values from brief above.
2. Update `app/globals.css` CSS variables to match visual identity.
3. Replace `lib/content.js` — generate all seed articles + Studies + Trackers + Newswire + Opinion.
4. Update Google Fonts link in site.config.js (Inter from Google Fonts).
5. Create page routes for special content types: `app/studies/[slug]/page.jsx`, `app/trackers/[slug]/page.jsx`, `app/newswire/[slug]/page.jsx`, `app/opinion/[slug]/page.jsx`.
6. Update `package.json` name to "finserv-pulse".
7. Run `npm install` then `npm run build` — fix any errors.
8. Initialize git, create GitHub repo, and push:
   ```
   git init
   git add -A
   git commit -m "Initial FinServ Pulse scaffold from piano-demo-template"
   gh repo create MarkRDalton8/finserv-pulse --public --source=. --push
   ```
9. Print Piano Dashboard Checklist.

Do NOT modify the standard components — they are already parameterized via site.config.js.
```
