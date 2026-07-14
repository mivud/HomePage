# PROJECT.md — Project Overview

## What This Is

A static personal portfolio/homepage site for Minh D. Vu, built on the BootstrapMade "Personal" template (v2.1.0). Single main page (`index.html`) plus an independent CV sub-page (`cv/index.html`). No backend, no database, no API, no build step — plain HTML/CSS/JavaScript served as-is.

Hosted on GitHub Pages under the custom domain `hnim.info` (see [`CNAME`](../CNAME)).

## Tech Stack

- **Markup/styling:** Hand-written HTML5 + CSS3 (`assets/css/style.css`), Google Fonts (Open Sans, Raleway, Poppins).
- **Scripting:** jQuery + a small amount of hand-written vanilla JS (`assets/js/main.js`, `assets/js/data.js`). No framework (no React/Vue/Angular/Next.js), no TypeScript.
- **CSS framework:** Bootstrap 4.4.1 (vendored under `assets/vendor/bootstrap/`) on the main site; a separately-vendored Bootstrap 4.6.0 under `cv/lib/bootstrap-4.6.0-dist/` for the CV sub-page. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for why these are out of sync.
- **Vendor plugins** (all manually vendored under `assets/vendor/`, no package manager): Icofont, Remixicon, Boxicons (icon sets), Owl Carousel, Isotope, Venobox, Typed.js, jQuery Waypoints, CounterUp, jQuery Easing, php-email-form.
- **Build tooling:** None. There is no `package.json`, no bundler, no linter/formatter config, and no test runner. Files are edited directly and served as static assets.
- **Hosting:** GitHub Pages, custom domain via `CNAME` (`hnim.info`).

## Folder Structure

```
index.html              Main single-page site (hash-section navigation)
CNAME                   GitHub Pages custom domain
favicon.ico
assets/
  css/style.css         Main site stylesheet
  js/main.js            Main site behavior (jQuery, nav/section toggling, plugin init)
  js/data.js             Personal data (name, job, dates) injected into the DOM by class name
  img/                   Images (avatar, backgrounds)
  vendor/                Vendored third-party libraries (Bootstrap 4.4.1, jQuery, icon sets, carousel/lightbox/counter plugins)
cv/
  index.html             Independent CV page — its own layout, not part of the main site's section-toggle nav
  css/site.css           CV-specific stylesheet
  lib/                   CV's own vendored Bootstrap 4.6.0 + Font Awesome 5.15.2 (separate from assets/vendor/)
  images/                CV-specific images
```

## Current Status

Synced with the AI ecosystem (`.claude/`) on 2026-07-14. See [`AI_CONTEXT.md`](./AI_CONTEXT.md) for known limitations and priorities.

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — page structure, script/style loading order.
- [`COMPONENTS.md`](./COMPONENTS.md) — reusable page sections and vendor plugin usage.
- [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) — design system, responsive/accessibility conventions.
- [`DEVELOPER_GUIDE.md`](./DEVELOPER_GUIDE.md) — coding conventions, how to make a change.
- [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) — vendored library versions and known gotchas.
