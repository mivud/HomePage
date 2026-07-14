# ARCHITECTURE.md — Site Structure & Design Decisions

## Overview

This is a static, multi-page site with two independent parts that don't share a build process or a common asset pipeline:

1. **Main site** (`index.html` + `assets/`) — a single HTML document whose sections behave like a lightweight single-page app: clicking a nav link doesn't navigate to a new page, it toggles which `<section>` is visible via JS/CSS classes.
2. **CV sub-page** (`cv/index.html` + `cv/`) — a separate, ordinary static page with its own stylesheet and its own vendored copy of Bootstrap/Font Awesome. It does not use the main site's section-toggle navigation.

There is no shared templating, no server-side includes, and no build step joining the two — each page's `<head>` lists out its own CSS/JS dependencies directly.

## Main Site Page Structure

`index.html` sections, in DOM order (see the `<section id="...">` elements):
- `#header` — name/title, typed.js animated role text, nav menu, social links.
- `#about` — bio, personal details (populated from `assets/js/data.js`).
- `#education` — education history.
- `#experience` — work experience, skill bars (animated via jQuery Waypoints + a `.progress-bar` width set on scroll-into-view).

The template ships vendor plugins for a portfolio grid (Isotope + Venobox) and a testimonials carousel (Owl Carousel) — see [`COMPONENTS.md`](./COMPONENTS.md) — but the current page has no corresponding `#portfolio`/`#testimonials` sections. Those scripts still load on every page view with nothing to act on; see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).

## Navigation Behavior

`assets/js/main.js` implements hash-based section switching:
- Clicking a `.nav-menu`/`.mobile-nav` link intercepts the click, adds `.header-top` to `#header`, and swaps the `.section-show` class from the current section to the target section (with a short `setTimeout` for the header's collapse transition).
- On page load, if the URL already has a hash, the matching section is activated immediately (deep-linking support).
- A mobile nav is generated at runtime by cloning `.nav-menu` and appending a toggle button + overlay — there's no separate mobile markup to maintain by hand.

## Script/Style Loading Order (`index.html`)

1. Google Fonts (external, render-blocking by default — no `preload`/`font-display` override currently set).
2. Vendor CSS: Bootstrap → Icofont → Remixicon → Owl Carousel → Boxicons → Venobox.
3. `assets/css/style.css` (site-specific overrides, loaded last so it can override vendor defaults).
4. Body content.
5. Vendor JS (bottom of body, in dependency order): jQuery → Bootstrap bundle → jQuery Easing → php-email-form → Waypoints → CounterUp → Owl Carousel → Isotope → Venobox → Typed.js.
6. `assets/js/main.js` (behavior, plugin initialization) → `assets/js/data.js` (personal data injection).

`main.js` must load before `data.js` is unnecessary for correctness (they don't depend on each other directly), but both must load after jQuery and the vendor plugins they call into.

## CV Sub-Page

`cv/index.html` is a plain static page, not part of the main site's nav/section system. It loads its own Bootstrap 4.6.0 and Font Awesome 5.15.2 from `cv/lib/`, its own `cv/css/site.css`, and reuses `assets/js/data.js` via a relative path (`../js/data.js`) — see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for a known issue with that reference.

## Design Decisions

- **No build tooling by design (so far):** the project trades away minification/bundling/linting for zero-setup editing — any change to this should be a deliberate, discussed decision, not something introduced incidentally by a single feature.
- **Two independently-vendored Bootstrap copies:** the main site and the CV page were never unified onto one shared vendor directory. Treat them as two separate surfaces when upgrading either.
- **No client-side routing framework:** the "single-page" feel on the main site is hand-rolled with class toggling, not a router — keep new interactive behavior consistent with that pattern rather than introducing a routing library for a handful of sections.

## Related Docs

- [`COMPONENTS.md`](./COMPONENTS.md) — reusable sections and the vendor plugins each depends on.
- [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) — vendored versions, the CV page's broken relative path, and other gotchas.
