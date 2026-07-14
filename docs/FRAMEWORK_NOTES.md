# FRAMEWORK_NOTES.md — Vendored Libraries, Hosting, and Gotchas

Read this before touching any vendored library, build/hosting config, or cross-page shared file — the versions and quirks below are specific to what's actually in this repo, not assumptions from training data.

## No Package Manager

There is no `package.json`, `npm`/`yarn`/`pnpm` lockfile, or build tool anywhere in this repo. All third-party libraries are vendored as committed files under `assets/vendor/` (main site) or `cv/lib/` (CV page). `dependency-auditor` should treat a vendored library the same as a package-manager dependency — check its version against upstream advisories/changelogs manually, since there's no `npm audit`-equivalent to run.

## Vendored Library Inventory (main site — `assets/vendor/`)

| Library | Purpose |
|---|---|
| Bootstrap **4.4.1** | Grid/layout/utility CSS + JS bundle |
| jQuery | DOM/event handling, required by most other vendor plugins |
| jQuery Easing | Easing functions for jQuery animations |
| Icofont | Icon font |
| Remixicon | Icon font |
| Boxicons | Icon font |
| Owl Carousel | Testimonials carousel (see [`COMPONENTS.md`](./COMPONENTS.md)) |
| Isotope | Portfolio grid filtering (see [`COMPONENTS.md`](./COMPONENTS.md)) |
| Venobox | Lightbox for portfolio items |
| Typed.js | Animated typed text in the header |
| jQuery Waypoints | Scroll-triggered callbacks (skill bar animation) |
| CounterUp | Animated number counters |
| php-email-form | Contact form validation/submission scaffold |

## Vendored Library Inventory (CV page — `cv/lib/`)

| Library | Purpose |
|---|---|
| Bootstrap **4.6.0** | Grid/layout/utility CSS + JS — a separate copy from the main site's 4.4.1, not shared |
| Font Awesome **5.15.2** | Icon font used only on the CV page |

**Known gotcha:** the main site and the CV page each vendor their own copy of Bootstrap at different versions (4.4.1 vs. 4.6.0). Upgrading one does not upgrade the other — treat them as two independent upgrade targets, and check both if a Bootstrap-related fix/CVE needs addressing.

## Known Issue: CV Page's Relative Script Path

`cv/index.html` loads `../js/jquery.min.js` and `../js/data.js` — these paths resolve to `<repo-root>/js/...`, but no top-level `js/` directory exists in this repo (the actual files live at `assets/js/`). This looks like a stale/broken reference from when the folder layout changed. It has not been fixed as part of this documentation sync — flag it to the user before "fixing" it, since it may be intentional (e.g. relying on a redirect/rewrite at the hosting layer) or simply unnoticed breakage.

## Hosting

- Deployed via **GitHub Pages** with a custom domain, set via the [`CNAME`](../CNAME) file (`hnim.info`).
- No CI/CD pipeline, no deploy script — pushing to the branch GitHub Pages serves from is the deploy mechanism.
- No server-side config is possible (GitHub Pages serves static files only) — anything requiring a server (real CORS control, server-side redirects beyond GitHub Pages' own settings, environment secrets) is out of scope for this project as currently hosted.

## Google Tag Manager

`index.html` includes a GTM `<noscript>` snippet (container `GTM-5BB8W2X`). There's no corresponding GTM script snippet visible in the head at present — worth confirming with the user whether GTM is fully wired up or only partially present, if analytics behavior is ever in question.
