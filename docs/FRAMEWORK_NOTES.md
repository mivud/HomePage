# FRAMEWORK_NOTES.md — Vendored Libraries, Hosting, and Gotchas

Read this before touching any vendored library, build/hosting config, or cross-page shared file — the versions and quirks below are specific to what's actually in this repo, not assumptions from training data.

## No Package Manager

There is no `package.json`, `npm`/`yarn`/`pnpm` lockfile, or build tool anywhere in this repo. All third-party libraries are vendored as committed files under `assets/vendor/` (main site) or `cv/lib/` (CV page). `dependency-auditor` should treat a vendored library the same as a package-manager dependency — check its version against upstream advisories/changelogs manually, since there's no `npm audit`-equivalent to run.

## Vendored Library Inventory (main site — `assets/vendor/`)

As of the 2026-07-14 "Liquid Glass" refactor, this inventory shrank considerably — several previously-vendored plugins were removed entirely (not just left unused):

| Library | Purpose |
|---|---|
| Bootstrap **5.3.8** | Grid/layout/utility CSS + JS bundle (upgraded from 4.4.1 in place) |
| Bootstrap Icons **1.13.1** | Icon font — the sole icon set, replacing Icofont, Remixicon, and Boxicons (all deleted) |
| jQuery | DOM/event handling — still required by `assets/js/main.js` and the Bootstrap JS bundle |
| Typed.js | Animated typed text in the header |

Removed this session (directories deleted entirely): Icofont, Remixicon, Boxicons, Owl Carousel, Isotope, Venobox, jQuery Waypoints, CounterUp, jQuery Easing, php-email-form. These were either dead-on-arrival (no matching markup ever existed on this page) or superseded by the new design. Both Bootstrap 5.3.8 and Bootstrap Icons 1.13.1 were vetted via `dependency-auditor` before landing: no known vulnerabilities, MIT licensed, actively maintained, and Bootstrap Icons is a net footprint reduction versus the three icon fonts it replaced.

## Vendored Library Inventory (CV page — `cv/lib/`)

| Library | Purpose |
|---|---|
| Bootstrap **4.6.0** | Grid/layout/utility CSS + JS — a separate copy from the main site's, not shared |
| Font Awesome **5.15.2** | Icon font used only on the CV page |

`cv/` was explicitly out of scope for the 2026-07-14 refactor and is unchanged.

**Known gotcha:** the main site and the CV page each vendor their own copy of Bootstrap at different versions — this gap widened this session (main site 4.4.1→5.3.8; CV page still 4.6.0). Upgrading one does not upgrade the other — treat them as two independent upgrade targets, and check both if a Bootstrap-related fix/CVE needs addressing. Note the two are now two *major* versions apart (4.x vs. 5.x), not just a minor-version gap — a shared component/pattern between the two pages can no longer assume compatible Bootstrap class/JS APIs.

## Known Issue: CV Page's Relative Script Path

`cv/index.html` loads `../js/jquery.min.js` and `../js/data.js` — these paths resolve to `<repo-root>/js/...`, but no top-level `js/` directory exists in this repo (the actual files live at `assets/js/`). This looks like a stale/broken reference from when the folder layout changed. It has not been fixed as part of this documentation sync — flag it to the user before "fixing" it, since it may be intentional (e.g. relying on a redirect/rewrite at the hosting layer) or simply unnoticed breakage.

## Hosting

- Deployed via **GitHub Pages** with a custom domain, set via the [`CNAME`](../CNAME) file (`hnim.info`).
- No CI/CD pipeline, no deploy script — pushing to the branch GitHub Pages serves from is the deploy mechanism.
- No server-side config is possible (GitHub Pages serves static files only) — anything requiring a server (real CORS control, server-side redirects beyond GitHub Pages' own settings, environment secrets) is out of scope for this project as currently hosted.

## Google Tag Manager

`index.html`'s `<head>` now includes both the GTM script snippet and its matching `<noscript>` fallback, container `GTM-WK7ZJ67R`. This is a change from the previously-documented state (container `GTM-5BB8W2X`, `<noscript>` only, no script snippet) — the ID and completeness changed as part of the same commit as the visual refactor, but this wasn't called out in the refactor's own description. Flagged for confirmation: verify with the user whether this GTM change was intentional (e.g. a new/replacement container) rather than an accidental artifact of the refactor.
