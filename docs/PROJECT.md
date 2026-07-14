# PROJECT.md — Project Overview

## What This Is

A static personal portfolio/homepage site for Minh D. Vu, built on the BootstrapMade "Personal" template (v2.1.0). Single main page (`index.html`) plus an independent CV sub-page (`cv/index.html`). No backend, no database, no API, no build step — plain HTML/CSS/JavaScript served as-is.

Hosted on GitHub Pages under the custom domain `hnim.info` (see [`CNAME`](../CNAME)).

## Tech Stack

- **Markup/styling:** Hand-written HTML5 + CSS3 (`assets/css/style.css`), a single Google Fonts family (Inter). Visual design is the "Liquid Glass" theme — a light, frosted-glass aesthetic built on a CSS custom-property token layer. See [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) for the design system.
- **Scripting:** jQuery + hand-written vanilla JS (`assets/js/main.js`, `assets/js/data.js`, `assets/js/reveal.js`). No framework (no React/Vue/Angular/Next.js), no TypeScript.
- **CSS framework:** Bootstrap 5.3.8 (vendored under `assets/vendor/bootstrap/`) on the main site; a separately-vendored Bootstrap 4.6.0 under `cv/lib/bootstrap-4.6.0-dist/` for the CV sub-page. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for why these are out of sync (the gap widened this session).
- **Vendor plugins** (all manually vendored under `assets/vendor/`, no package manager): Bootstrap Icons (icon set), Typed.js (hero role-cycling text). jQuery is kept only because `main.js` and the Bootstrap JS bundle still use it.
- **Build tooling:** None. There is no `package.json`, no bundler, no linter/formatter config, and no test runner. Files are edited directly and served as static assets.
- **Hosting:** GitHub Pages, custom domain via `CNAME` (`hnim.info`).

## Folder Structure

```
index.html              Main single-page site (click-driven tab navigation, see ARCHITECTURE.md)
CNAME                   GitHub Pages custom domain
favicon.ico
assets/
  css/style.css         Main site stylesheet (design tokens + Liquid Glass component classes)
  js/main.js            Main site behavior (jQuery, mobile nav, tab switching, header condensing)
  js/data.js             Personal data (name, job, dates) injected into the DOM by class name
  js/reveal.js           Vanilla IntersectionObserver scroll-reveal for [data-reveal] elements
  img/                   Images (avatar; the backgrounds/ subfolder is currently empty)
  vendor/                Vendored third-party libraries: Bootstrap 5.3.8, Bootstrap Icons 1.13.1, jQuery, Typed.js
cv/
  index.html             Independent CV page — its own layout, not part of the main site's section-toggle nav
  css/site.css           CV-specific stylesheet
  lib/                   CV's own vendored Bootstrap 4.6.0 + Font Awesome 5.15.2 (separate from assets/vendor/)
  images/                CV-specific images
```

## Current Status

The main site went through a full visual refactor on 2026-07-14 ("Liquid Glass": Bootstrap 4.4.1→5.3.8, three icon fonts consolidated to Bootstrap Icons, dark theme replaced with a light frosted-glass design-token system, new Contact section and footer). `cv/` was explicitly out of scope and is unchanged. See [`AI_CONTEXT.md`](./AI_CONTEXT.md) for known limitations and priorities.

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — page structure, script/style loading order.
- [`COMPONENTS.md`](./COMPONENTS.md) — reusable page sections and vendor plugin usage.
- [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) — design system, responsive/accessibility conventions.
- [`DEVELOPER_GUIDE.md`](./DEVELOPER_GUIDE.md) — coding conventions, how to make a change.
- [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) — vendored library versions and known gotchas.
