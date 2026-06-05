# Piano Template Development Guide

## Overview

Piano templates are HTML + CSS files that render inside an iframe within Composer experiences. They use AngularJS directives for dynamic behavior and `[%% field %%]` syntax for configurable content fields. This guide documents how to create offer, registration, and subscription templates that work reliably.

---

## File Structure

Piano templates have **two separate files** pasted into the Piano dashboard (Manage → Templates):

1. **HTML tab** — markup + `<script>` blocks
2. **CSS tab** — all styling (referenced via `<link>` in HTML but Piano injects it automatically)

---

## HTML Template Anatomy

```html
<!-- Fonts (loaded from Google Fonts or CDN) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=YOUR+FONTS&display=swap" rel="stylesheet">

<!-- Piano config: tells Composer how to render the close button -->
<config close-button-type="boilerplate"></config>

<!-- Main container -->
<div class="your-container-class">

    <!-- HEADER: close button + login dropdown (Piano provides these components) -->
    <div class="your-header">
        <div class="header-controls">
            <language-selector class="language-selector"></language-selector>
        </div>
        <div class="account-area">
            <boilerplate-login-dropdown></boilerplate-login-dropdown>
        </div>
        <button ng-if="isShowBoilerplateCloseButton()" class="close-btn unbutton" type="button" ng-click="close()" external-event="offer-close-modal">
            <span class="visually-hidden">Close</span>
            <!-- close icon SVG -->
        </button>
    </div>

    <!-- BODY: your custom content -->
    <div class="body">
        <!-- Static content fields (configured in Piano dashboard) -->
        <div class="eyebrow">[%% eyebrow %%]</div>
        <h1 class="headline">[%% headline %%]</h1>
        <p class="description">[%% description %%]</p>

        <!-- Benefits list (use ng-if to hide empty ones) -->
        <div class="benefit" ng-if="'[%% benefit1 %%]' !== ''">
            <span class="check">✓</span><span>[%% benefit1 %%]</span>
        </div>

        <!-- DYNAMIC TERMS: Piano provides the `terms` array from the offer -->
        <ul class="terms list">
            <li class="term" ng-repeat="term in terms track by $index">
                <div class="term-info">
                    <h2 class="term-name">{{ term.name }}</h2>
                    <p class="term-desc" ng-if="term.description">{{ term.description }}</p>
                </div>
                <button class="subscribe-btn unbutton"
                        type="button"
                        ng-click="startCheckout(term.termId)"
                        external-event="offer-subscribe-{{ $index }}">
                    <!-- For paid terms: show price -->
                    <span ng-show="isPayableTerm(term)">
                        <span class="price">{{ term.billingPlanTable[0].price }}</span>
                        <span class="period">/ {{ term.billingPlanTable[0].billingPeriod }}</span>
                    </span>
                    <!-- For free/registration terms -->
                    <span ng-hide="isPayableTerm(term)">
                        Subscribe Free
                    </span>
                </button>
            </li>
        </ul>
    </div>
</div>

<!-- Optional: custom JavaScript -->
<script>
    // Use window.top to access the parent page (template is in an iframe)
    function handleLogin() {
        window.top.tp.pianoId.show({
            screen: 'login',
            displayMode: 'modal',
            loggedIn: function() { window.top.location.reload(); }
        });
    }
</script>
```

---

## Key Piano Directives & Variables

### AngularJS Directives (built into Piano's runtime)

| Directive | Purpose |
|-----------|---------|
| `ng-repeat="term in terms track by $index"` | Loop through offer terms |
| `ng-click="startCheckout(term.termId)"` | Trigger Stripe/payment checkout |
| `ng-click="close()"` | Close the modal |
| `ng-if="isShowBoilerplateCloseButton()"` | Conditionally show close button |
| `ng-show="isPayableTerm(term)"` | Show only for paid terms |
| `ng-hide="isPayableTerm(term)"` | Show only for free/registration terms |
| `ng-if="'[%% field %%]' !== ''"` | Conditionally show based on content field |
| `external-event="event-name"` | Analytics event tracking |

### Piano-Provided Components

| Component | What it renders |
|-----------|----------------|
| `<boilerplate-login-dropdown>` | Login/account dropdown in header |
| `<language-selector>` | Language picker (if multi-language enabled) |
| `<config close-button-type="boilerplate">` | Tells Piano to use template's own close button |

### Term Object Properties

Available inside `ng-repeat="term in terms"`:

| Property | Type | Example |
|----------|------|---------|
| `term.termId` | string | `"TMXYZ123"` |
| `term.name` | string | `"Annual Subscription"` |
| `term.description` | string | `"Full access to all content"` |
| `term.type` | string | `"payment"`, `"registration"`, `"gift"`, `"external"` |
| `term.hasFreeTrial` | boolean | `true` / `false` |
| `term.firstRealPrice` | string | `"$49.99"` (sometimes empty!) |
| `term.firstPeriod` | string | `"year"` |
| `term.billingPlanTable[0].price` | string | `"$49.99"` (more reliable) |
| `term.billingPlanTable[0].billingPeriod` | string | `"1 year"` |
| `term.chargeAmount` | number | `49.99` |
| `term.chargeCurrency` | string | `"USD"` |

**Important:** Use `term.billingPlanTable[0].price` and `term.billingPlanTable[0].billingPeriod` instead of `term.firstRealPrice` / `term.firstPeriod` — the former is more reliable and always populated.

### Content Fields (`[%% field %%]`)

These are configured in the Piano dashboard when you create the template. They become editable fields in the offer/experience configuration.

- Used in HTML: `[%% headline %%]`
- Used in CSS: `background-color: [%% backgroundColor %%];`
- Conditional display: `ng-if="'[%% field %%]' !== ''"`

---

## CSS Template Rules

### Required Resets

Always include these at the top of your CSS — Piano's iframe has inconsistent defaults:

```css
.visually-hidden {
  position: absolute; width: 1px; height: 1px; margin: -1px;
  border: 0; padding: 0; white-space: nowrap;
  clip-path: inset(100%); clip: rect(0 0 0 0); overflow: hidden;
}

.unbutton {
  margin: 0; padding: 0; color: inherit; text-decoration: none;
  background-color: transparent; box-shadow: none; outline: 0; border: 0;
}

.list { margin: 0; padding: 0; list-style: none; }
h1, h2, h3 { margin: 0; font-weight: normal; }
p { margin: 0; }
* { box-sizing: border-box; }
```

### Color Variables via Content Fields

Use `[%% field %%]` in CSS for colors the user can configure:

```css
.container { background-color: [%% backgroundColor %%]; }
.button { background: [%% buttonColor %%]; color: [%% buttonTextColor %%]; }
.headline { color: [%% headlineColor %%]; }
```

### Responsive Design

Templates render in iframes of varying sizes. Always include mobile breakpoints:

```css
@media (max-width: 600px) {
  .term { flex-direction: column; text-align: center; }
  .button { width: 100%; }
}
```

---

## Common Template Types

### 1. Offer/Subscription Template (Modal)

Shows terms from an offer with checkout buttons. Used for:
- Content gates (paywall)
- Upgrade prompts
- Subscription offers

Key elements: `ng-repeat="term in terms"`, `startCheckout(term.termId)`

### 2. Registration Template (Modal/Inline)

Prompts user to register (no payment). Used for:
- Newsletter signup gates
- Free registration walls
- Account creation prompts

Key difference: uses `ng-hide="isPayableTerm(term)"` path, or custom JS:
```html
<button onclick="window.top.tp.pianoId.show({ screen: 'register', displayMode: 'modal', loggedIn: function() { window.top.location.reload(); } })">
    Register Free
</button>
```

### 3. Newsletter Signup Template (Inline)

Inline banner for email capture. Can use Piano ESP:
```html
<button onclick="window.top.tp.push(['init', function() { window.top.tp.pianoId.show({ screen: 'register' }); }])">
    Subscribe to Newsletter
</button>
```

---

## Gotchas & Lessons Learned

### 1. `term.firstRealPrice` can be empty
Use `term.billingPlanTable[0].price` instead — it's always populated for payment terms.

### 2. Templates render in an iframe
All references to the parent page must use `window.top`:
- `window.top.tp.offer.show(...)` 
- `window.top.tp.pianoId.show(...)`
- `window.top.location.href = '...'`
- `window.top.location.reload()`

### 3. You can't call `tp.offer.show()` from inside an offer template
The template IS the offer. Use `startCheckout(term.termId)` to trigger payment.

### 4. CSS is separate from HTML
Piano has two tabs in the template editor. The `<link rel="stylesheet" href="...">` in your HTML references the CSS Piano injects — the filename doesn't matter, Piano handles the connection.

### 5. `ng-click` vs `onclick`
- Use `ng-click` for Piano-provided functions: `startCheckout()`, `close()`
- Use `onclick` for custom JavaScript functions defined in your `<script>` block

### 6. Content fields with empty values
Wrap in `ng-if` to hide when not configured:
```html
<div ng-if="'[%% optionalField %%]' !== ''">[%% optionalField %%]</div>
```

### 7. Fonts must be loaded via CDN
Piano's iframe doesn't inherit parent page fonts. Always include Google Fonts `<link>` tags in the HTML.

### 8. The `<config>` tag
`<config close-button-type="boilerplate">` tells Piano to use YOUR close button instead of its default overlay one. Always include this for modal templates.

---

## Template Development Workflow

1. **Design in the demo site first** — build the visual layout as a React component on your site to iterate quickly on design
2. **Extract to static HTML/CSS** — convert the React component to plain HTML with Piano's Angular directives
3. **Add Piano scaffolding** — header with close button, login dropdown, `<config>` tag
4. **Replace dynamic content with `[%% fields %%]`** — anything the user should configure in the dashboard
5. **Replace hardcoded terms with `ng-repeat`** — let Piano inject the actual offer terms
6. **Add color fields to CSS** — `[%% backgroundColor %%]`, `[%% buttonColor %%]`, etc.
7. **Test in Piano dashboard** — paste HTML and CSS into template editor, attach to an offer, preview
8. **Iterate** — fix issues, re-paste

---

## Example: Meridian Physician Insights Template

See working files:
- HTML: `piano-physician-insights-offer-template.html`
- CSS: `piano-physician-insights-offer.css`

Content fields used:
| Field | Purpose |
|-------|---------|
| `backgroundColor` | Container background |
| `accentColor` | Eyebrow text, icon accent |
| `buttonColor` | CTA button background |
| `eyebrow` | Category label above headline |
| `headline` | Main heading |
| `description` | Subheading copy |
| `benefit1` through `benefit5` | Checkmark list items |
| `missionText` | Italic footer message |

---

## My Account Widget — Custom Fields

Custom fields written via the Publisher API (e.g., from progressive profiling) will only appear in the My Account widget if they are configured in the Piano dashboard:

**Piano Dashboard → Piano ID → Custom Fields → select the field → enable "My Account Form"**

This controls which fields are visible and editable in the user's My Account profile tab. Without this setting enabled, the field exists in the database but won't render in the widget.

Key points:
- Fields must be **created** in Piano ID → Custom Fields first (define name, type, options)
- Fields must be **included in the My Account Form** to appear in the widget
- The widget renders fields in the order they appear in the dashboard configuration
- To hide old/irrelevant fields from My Account, uncheck "My Account Form" on those fields
- Fields written via API (`/publisher/user/update` with `custom_fields`) are stored regardless of My Account visibility — the setting only controls display

### Progressive Profiling + My Account Flow

1. Site collects data via custom modal → writes to Piano custom fields via `/api/v3/publisher/user/update`
2. User visits My Account → sees those fields populated (if "My Account Form" is enabled)
3. User can edit their own fields in My Account (if field is marked editable)
