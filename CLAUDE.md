# Industry Insider — Claude Session Guide

## What This Is
A B2B trade publication demo site showcasing Piano's lead capture model for B2B publisher prospects (Gardner Web, BNP Media, KHL Group, etc.). Free registration for premium content — no subscriptions. Revenue model: advertisers pay to reach the registered, profiled audience. Deployed on Vercel at **https://industry-insider.pianodemo.com**.

## Tech Stack
- **Next.js 14** (App Router, static site generation)
- **Vercel** — auto-deploys on push to `main`
- **Piano** — Composer, Analytics, ESP SDK loaded globally (AID: `7gZBRaNFpu`)
- **picsum.photos** / **loremflickr.com** — article images

---

## Architecture

### Config System
**`lib/site.config.js`** — branding, Piano config, feature flags, nav (including `NAV.extraLinks` for Resources/Webinars/Directory).

**`lib/content.js`** — exports 4 arrays: `ARTICLES`, `WHITEPAPERS`, `WEBINARS`, `DIRECTORY`.

### Content Types

| Type | Count | Route | Gated? |
|------|-------|-------|--------|
| Articles | 40 (8/section) | `/[section]/[slug]` | No — free traffic drivers |
| Whitepapers | 6 | `/resources/[slug]` | Yes — registration required |
| Webinars | 4 | `/webinars/[slug]` | Yes — registration required |
| Directory | 10 | `/directory/[slug]` | No — inquiry form captures leads |

### Sections (5)
| Slug | Label | Color |
|------|-------|-------|
| `news` | News & Trends | `#1E40AF` |
| `technology` | Technology | `#7C3AED` |
| `best-practices` | Best Practices | `#047857` |
| `market-analysis` | Market Analysis | `#B45309` |
| `leadership` | Leadership | `#0891B2` |

---

## Piano Integration

### Scripts (loaded globally in `app/layout.jsx`)
1. **Composer** — AID: `7gZBRaNFpu`
2. **Analytics** — conditional on env vars
3. **ESP** — conditional on env vars

### Named Piano Containers
| Class | Location | Purpose |
|-------|----------|---------|
| `piano-container` | Locked articles | Standard paywall |
| `piano-home` | Homepage | Marketing placement |
| `piano-subscribe` | /register page | Registration (page has built-in template) |
| `piano-resource-gate` | Whitepaper detail pages | Gates download — triggers registration |
| `piano-webinar-gate` | Webinar detail pages | Gates video — triggers registration |
| `piano-newsletter` | Article pages, homepage | Newsletter email capture |
| `piano-directory-cta` | Directory detail pages | Lead capture prompt |

### Content Sections for Composer Targeting
| Section | Pages |
|---------|-------|
| `resources` | Whitepaper listing |
| `resources/article` | Whitepaper detail pages |
| `webinars` | Webinar listing |
| `webinars/article` | Webinar detail pages |
| `register` | /register page |
| `directory` | Directory pages |
| `home` | Homepage |

### Registration Template
- Template ID: `OTOZUR0NOKDJ`
- Blue/Inter scheme, user-add icon, free registration flow
- Content fields: `eyebrow`, `headline`, `description`, `benefit1-5`, `footerText`, `backgroundColor`, `accentColor`, `buttonColor`

### Access Model
- Free registration model — logged in = access granted
- When `PIANO.resourceId` is not set, whitepaper/webinar pages check login state directly
- Anonymous users see the registration gate; logged-in users see full content

---

## Lead Capture Flow

| Stage | Trigger | Data Captured | Stored In |
|-------|---------|---------------|-----------|
| Registration | Click whitepaper/webinar gate | Name, email, Company Name | Piano ID |
| Progressive Profile Stage 1 | 3 page views post-registration | Job Title | Piano custom field `job-level` + localStorage |
| Progressive Profile Stage 2 | Next page navigation after Stage 1 | Industry, Company Size, Department | Piano custom fields `industry`, `company-size`, `department` |
| Directory inquiry | "Request Info" form | Name, email, company, message | localStorage |

### Piano Custom Field IDs (case-sensitive)
| Field | Piano ID | Type | Values |
|-------|----------|------|--------|
| Company Name | `Company Name` | Text | Free text (captured at registration) |
| Job Title | `job-level` | Single Select | C-Level, VP, Director, Manager, Individual Contributor, Consultant |
| Industry | `industry` | Single Select | Manufacturing, Construction, Energy, Healthcare, Technology, Financial Services, Retail, Transportation, Government, Education, Media, Other |
| Company Size | `company-size` | Single Select | 1-50, 51-200, 201-1,000, 1,001-5,000, 5,000+ |
| Department | `department` | Single Select | Executive, Operations, IT/Technology, Marketing, Sales, Finance, Engineering, Procurement, HR, Other |

---

## Progressive Profiling

### How It Works
- Component: `components/ProgressiveProfileModal.jsx` (bottom-right flyout)
- Counts pageviews since registration using `ppmodal_registered_at` baseline
- Stage 1 fires at 3 post-registration pageviews, Stage 2 on next navigation
- Each stage shows a green checkmark thank-you message before dismissing
- Writes to Piano via `POST /api/piano-profile` (Publisher API)
- Job level also saved to `localStorage('ppmodal_job_level')` for client-side targeting

### localStorage Keys
| Key | Purpose |
|-----|---------|
| `industry_insider_pageviews` | Total page view count |
| `ppmodal_registered_at` | Pageview count at registration (baseline) |
| `ppmodal_stage1_done` | Stage 1 completed flag |
| `ppmodal_stage2_done` | Stage 2 completed flag |
| `ppmodal_job_level` | Job level selection (for C-Level banner) |

### Future Enhancement
Progressive profiling timing could be moved to Composer control via `window.showProfileStage(1)` / `window.showProfileStage(2)` global functions, letting Composer handle all targeting rules.

---

## C-Level Executive Banner

- Component: `components/CLevelBanner.jsx`
- Fixed bottom flyout (purple gradient, gold accents) on all webinar pages
- Only shows when: `ppmodal_stage2_done` = '1' AND `ppmodal_job_level` = 'C-Level'
- Invites C-suite leaders to an exclusive executive briefing
- Dismissible per session (`clevel_banner_dismissed` in sessionStorage)
- Rendered via `app/webinars/layout.jsx` (applies to listing + detail pages)

---

## Key Files
| File | Purpose |
|------|---------|
| `lib/site.config.js` | All config, Piano IDs, feature flags |
| `lib/content.js` | Articles, whitepapers, webinars, directory data |
| `app/layout.jsx` | Root layout — Piano scripts, header, footer, profiling |
| `app/page.jsx` | Homepage |
| `app/[section]/page.jsx` | Section landing pages |
| `app/[section]/[slug]/page.jsx` | Article detail + OG metadata |
| `app/resources/page.jsx` | Whitepaper listing |
| `app/resources/[slug]/page.jsx` | Whitepaper detail + gate |
| `app/webinars/page.jsx` | Webinar listing |
| `app/webinars/[slug]/page.jsx` | Webinar detail + gate |
| `app/webinars/layout.jsx` | Webinar layout (adds CLevelBanner) |
| `app/directory/page.jsx` | Buyer's guide listing |
| `app/directory/[slug]/page.jsx` | Company detail + inquiry form |
| `app/register/page.jsx` | Registration page (built-in template) |
| `app/api/piano-profile/route.js` | Piano Publisher API proxy (custom fields) |
| `components/ProgressiveProfileModal.jsx` | Two-stage profiling flyout |
| `components/CLevelBanner.jsx` | C-Level exclusive webinar banner |
| `components/WhitepaperContent.jsx` | Whitepaper display + gate |
| `components/WebinarContent.jsx` | Webinar display + gate |
| `components/DirectoryInquiryForm.jsx` | Lead capture form |
| `templates/registration-template.html` | Piano Composer template (HTML) |
| `templates/registration-template.css` | Piano Composer template (CSS) |

---

## Env Vars (Vercel)
| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_PIANO_AID` | No (fallback: `7gZBRaNFpu`) | Piano Application ID |
| `PIANO_API_TOKEN` | Yes | Server-side API token for Publisher API |
| `NEXT_PUBLIC_PIANO_ANALYTICS_SITE` | No | Piano Analytics site ID |
| `NEXT_PUBLIC_PIANO_ANALYTICS_DOMAIN` | No | Piano Analytics domain |
| `NEXT_PUBLIC_PIANO_ESP_HASH` | No | Piano ESP hash |
| `NEXT_PUBLIC_PIANO_RESOURCE_ID` | No | Resource ID for access checks (optional) |

---

## Demo Sequence

1. **Anonymous browsing** — articles are free, subscribe ribbon slides up
2. **Click whitepaper/webinar** — preview text visible, registration gate blocks content
3. **Register** — Piano ID modal, captures name + email + company
4. **Post-registration browsing** — content unlocked, pageview counter starts
5. **3 pages later** — Stage 1 flyout: Job Title
6. **Next navigation** — Stage 2 flyout: Industry, Company Size, Department
7. **Visit webinar page as C-Level** — purple executive briefing banner slides up
8. **Directory** — browse listings, submit inquiry form
