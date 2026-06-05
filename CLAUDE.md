# Piano Demo Template — Claude Session Guide

## What This Is
A reusable template for creating Piano demo publisher sites. Each site showcases Piano's Composer, Analytics, ESP, Piano ID, and optionally Site Licensing and Publisher API products. Deploy on Vercel at `*.pianodemo.com`.

## Tech Stack
- **Next.js 14** (App Router, static site generation)
- **Vercel** — auto-deploys on push to `main`
- **Piano** — Composer, Analytics, ESP SDK loaded globally (all config-driven)
- **loremflickr.com** — section-keyword-based article images

---

## Architecture

### Config System
Two files drive the entire site:

**`lib/site.config.js`** — brand identity + Piano config + feature flags:
- `SITE` — name, tagline, domain, description
- `FONTS` — heading, body, ui, Google Fonts URL
- `COLORS` — primary, dark, border
- `SECTIONS[]` — slug, label, color, tagline, imageKeywords
- `PIANO` — aid, sandbox, analyticsId, analyticsDomain, espHash, offerId, resourceId
- `FEATURES` — aiPublisher, siteLicensing, progressiveProfile, subscribeRibbon, pageViewTracker
- `NAV` — showSubscribeButton, subscribeCta, subscribeCopy

**`lib/content.js`** — all article content as exported arrays.

### Content System
All content lives in `lib/content.js` as exported arrays. No database or CMS.

Article shape:
```js
{
  id: 1,
  slug: 'kebab-case-url',
  section: 'news',          // must match a SECTIONS[].slug
  title: 'Headline',
  byline: 'Staff Writer',
  date: 'May 8, 2026',
  category: 'Government',
  excerpt: 'One sentence.',
  body: ['Para 1', 'Para 2', ...],
  tags: ['news', 'government'],
  locked: true,
  featured: false,
}
```

Additional content types (studies, trackers, courses) can be added as separate exported arrays following the same pattern.

---

## Piano Integration

### Scripts (loaded globally in `app/layout.jsx`)
All conditional on config values being set:
1. **Composer** — loads if `PIANO.aid` is set
2. **Analytics** — loads if `PIANO.analyticsId` AND `PIANO.analyticsDomain` are set
3. **ESP** — loads if `PIANO.espHash` is set

### Per-Page Piano Setup
Every page renders `<PianoInit section="..." />` which calls:
- `tp.push(['setContentSection', section])`
- `tp.push(['setTags', tags])` (if tags provided)
- `tp.experience.execute()`

### Named Piano Containers
Empty divs that Composer injects experiences into:
| Class | Location | Purpose |
|-------|----------|---------|
| `piano-container` | Locked articles | Paywall gate (2-para fade) |
| `piano-home` | Homepage | Marketing placement |
| `piano-subscribe` | Subscribe page | Registration/offer form |

To add section-specific containers: add `<div className="piano-{name}" />` in `ArticleContent.jsx`, then create the Composer experience targeting that class.

### OG + Meta Tags
Set via `generateMetadata` in `app/[section]/[slug]/page.jsx`:
- Full OpenGraph: title, description, url, type, image, publishedTime, authors, section, tags
- `cXenseParse:image` — for Piano Content/Insight feed crawlers

### Paywall Behavior
- Articles with `locked: true` show first 2 paragraphs, then the `piano-container` div
- If `PIANO.resourceId` is set, access checks grant full content to subscribers
- CSS fade gradient applied via `.piano-container--active` class (set by Composer)

---

## Key Files
| File | Purpose |
|------|---------|
| `lib/site.config.js` | All site config, Piano IDs, feature flags |
| `lib/content.js` | All article content |
| `app/layout.jsx` | Root layout — Piano scripts, header, footer |
| `app/page.jsx` | Homepage (latest + per-section rails) |
| `app/[section]/page.jsx` | Section landing pages |
| `app/[section]/[slug]/page.jsx` | Article detail + OG metadata |
| `components/ArticleContent.jsx` | Article display, image, paywall gate |
| `components/PianoInit.jsx` | Sets Piano context + fires experience.execute() |
| `components/Header.jsx` | Nav, login/logout, Piano ID handlers |
| `components/Footer.jsx` | Footer with section links |
| `components/SubscribeRibbon.jsx` | Slide-up registration CTA (3s delay) |
| `components/ArticleCard.jsx` | Article card (standard + featured variants) |
| `app/sitemap.js` | Auto-generated from sections + content |
| `app/robots.js` | Standard allow-all |

---

## Common Tasks

**Add an article** — append to `ARTICLES` in `lib/content.js`, increment the ID, commit and push.

**Add a section** — add entry to `SECTIONS[]` in `lib/site.config.js`. That's it — Header nav, Footer, section pages, and sitemap all derive from that array.

**Add a Piano container** — add `<div className="piano-xyz" />` in the relevant component, then create the Composer experience targeting that class.

**Change branding** — edit `SITE`, `FONTS`, `COLORS` in `lib/site.config.js` and CSS vars in `app/globals.css`.

**Enable paywall access checks** — set `NEXT_PUBLIC_PIANO_RESOURCE_ID` in `.env` (or `PIANO.resourceId` in config).

**Add a new content type** — export a new array from `lib/content.js`, create a page route (e.g., `app/studies/[slug]/page.jsx`), add to sitemap.

---

## Feature Flags (`FEATURES` in site.config.js)

| Flag | Default | What it enables |
|------|---------|-----------------|
| `subscribeRibbon` | true | Bottom slide-up CTA banner |
| `pageViewTracker` | true | localStorage page view counter |
| `aiPublisher` | false | Daily AI content generation (scripts/publish-daily.js) |
| `siteLicensing` | false | Site Licensing API demo console |
| `progressiveProfile` | false | Progressive profiling modal |

---

## Deployment

Push to GitHub → Vercel auto-deploys. Assign `*.pianodemo.com` subdomain in Vercel project settings.

### Piano Dashboard Setup (required for Piano ID / Composer to work)

After deploying to Vercel with a custom domain, you **must** whitelist the domain in Piano:

1. **Add domain to application** — Piano Dashboard → Settings → General → Allowed Domains → add your `*.pianodemo.com` subdomain. Without this, Composer and Piano ID will not execute on the site.
2. **Create Composer experiences** — At minimum, create experiences targeting:
   - `.piano-container` — paywall gate on locked articles
   - `.piano-subscribe` — registration/offer form on the subscribe page
3. **Create resource IDs** — If `PIANO.resourceId` is set, that resource must exist in the Piano dashboard under Resources.
4. **Configure Piano ID** — Ensure registration and login screens are set up for your application in Piano ID settings.

### Vercel Configuration

Required Vercel env vars (set in project dashboard):
- `NEXT_PUBLIC_PIANO_AID` — your Piano application ID
- Any other `NEXT_PUBLIC_PIANO_*` values from `.env.example`
