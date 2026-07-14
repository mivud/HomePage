# ARCHITECTURE.md — Site Structure & Design Decisions

## Overview

This is a static, multi-page site with two independent parts that don't share a build process or a common asset pipeline:

1. **Main site** (`index.html` + `assets/`) — a single HTML document whose sections behave like a lightweight single-page app: clicking a nav link doesn't navigate to a new page, it toggles which `<section>` is visible via JS/CSS classes.
2. **CV sub-page** (`cv/index.html` + `cv/`) — a separate, ordinary static page with its own stylesheet and its own vendored copy of Bootstrap/Font Awesome. It does not use the main site's section-toggle navigation.

There is no shared templating, no server-side includes, and no build step joining the two — each page's `<head>` lists out its own CSS/JS dependencies directly.

## Main Site Page Structure

`index.html` sections, in DOM order (see the `<section id="...">` elements):
- `#header` — name/title, professional title (`.job-description`, bound from `data.js`), typed.js animated role text, nav menu, social links.
- `#about` — contains two nested blocks: `.about-me` (bio/personal details, populated from `assets/js/data.js`) and `.interests` (a static 4-up icon grid). Both are inside the single `#about` section, not separate top-level sections.
- `#education` — education history.
- `#experience` — work experience.
- `#contact` — email/phone/location cards plus a social-links/"Say hello" card. A 5th switchable tab (see Navigation Behavior below).
- `<footer>` — copyright line. Sits *outside* the tab system: it is always visible regardless of which tab is active (see below).

The vendor plugins this template originally shipped for a portfolio grid (Isotope + Venobox) and a testimonials carousel (Owl Carousel) have been removed entirely (not just unused) as part of the 2026-07-14 visual refactor — there is no dead vendor-plugin weight to flag anymore. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for the current vendor inventory.

## Navigation Behavior

The nav is a **click-driven, single-section-visible ("tab") mechanism** — not scroll-based, and not the hash-driven `.section-show` toggle from before the refactor. (This was actually tried as a true anchor-scroll + IntersectionObserver scroll-spy nav during the refactor, then reverted back to click-driven tabs per user preference after an in-browser review — so if you're tempted to "restore" scroll-anchoring, that was a deliberate reversal, not an oversight.)

`assets/js/main.js` implements it:
- Clicking a `.nav-menu`/`.mobile-nav` link intercepts the click (`activateTab(hash)`), toggles `.is-active` on the matching `<section id="...">` (CSS `display: none` otherwise — see `assets/css/style.css`'s "Panel-swap tabs" block) and toggles `.active` on the corresponding nav `<li>`.
- Activating any tab other than `#header` also adds `.is-condensed` to `#header`, which CSS shrinks into a sticky top bar (title only, no role/typed text/social links) so the active tab's content has room; switching back to the `#header` tab removes it.
- A CSS `tab-fade-in` keyframe animation (opacity + translateY) plays when a section gains `.is-active`, disabled under `prefers-reduced-motion`.
- On page load, if the URL already has a hash matching a section, that tab is activated immediately (deep-linking support).
- The `<footer>` is not part of this tab system — it has no `id` and is never toggled, so it stays visible below whichever tab is showing.
- A mobile nav is generated at runtime by cloning `.nav-menu` and appending a toggle button + overlay (Bootstrap Icons `bi-list`/`bi-x-lg` swapped on toggle, with `aria-expanded`/`aria-controls` kept in sync) — there's no separate mobile markup to maintain by hand.

## Script/Style Loading Order (`index.html`)

1. Google Fonts (external, render-blocking by default — no `preload`/`font-display` override currently set). Single family: Inter.
2. Vendor CSS: Bootstrap → Bootstrap Icons.
3. `assets/css/style.css` (site-specific overrides + design tokens, loaded last so it can override vendor defaults).
4. Body content.
5. Vendor JS (bottom of body, in dependency order): jQuery → Bootstrap bundle → Typed.js (with an inline `<script>` configuring the typed strings directly in `index.html`).
6. `assets/js/main.js` (nav/tab behavior, mobile nav) → `assets/js/data.js` (personal data injection) → `assets/js/reveal.js` (scroll-reveal for `[data-reveal]` elements).

`main.js`, `data.js`, and `reveal.js` don't depend on each other directly, but all three must load after jQuery/Bootstrap since `main.js` uses jQuery.

## CV Sub-Page

`cv/index.html` is a plain static page, not part of the main site's nav/section system. It loads its own Bootstrap 4.6.0 and Font Awesome 5.15.2 from `cv/lib/`, its own `cv/css/site.css`, and reuses `assets/js/data.js` via a relative path (`../js/data.js`) — see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for a known issue with that reference.

## Design Decisions

- **No build tooling by design (so far):** the project trades away minification/bundling/linting for zero-setup editing — any change to this should be a deliberate, discussed decision, not something introduced incidentally by a single feature.
- **Two independently-vendored Bootstrap copies:** the main site and the CV page were never unified onto one shared vendor directory. Treat them as two separate surfaces when upgrading either.
- **No client-side routing framework:** the "single-page" feel on the main site is hand-rolled with class toggling, not a router — keep new interactive behavior consistent with that pattern rather than introducing a routing library for a handful of sections.
- **Design tokens via plain CSS custom properties, no Sass build:** the "Liquid Glass" visual system (glass blur/translucency, color/spacing tokens, Bootstrap 5 `--bs-*` overrides) lives in a `:root` block in `assets/css/style.css` — see [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) for the token list. This works without a build step because Bootstrap 5's compiled CSS already exposes its variables; don't introduce Sass/PostCSS for this alone.

## Related Docs

- [`COMPONENTS.md`](./COMPONENTS.md) — reusable sections and the vendor plugins each depends on.
- [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) — vendored versions, the CV page's broken relative path, and other gotchas.
