# ROADMAP.md — Planned Features & Technical Improvements

No roadmap items are currently tracked for this project. This file exists so future planned work has a canonical home — add entries here as they're decided rather than tracking them only in conversation.

## Recently Completed

- **"Liquid Glass" visual refactor of the main site (2026-07-14)** — Bootstrap 4.4.1→5.3.8, icon fonts consolidated to Bootstrap Icons, dark theme replaced with a light frosted-glass design-token system, new Contact section/footer, dormant data-binding bugs fixed, meta description and favicon MIME type fixed, dead vendor plugins (Owl Carousel/Isotope/Venobox/CounterUp/Waypoints/php-email-form) removed. See [`AI_CONTEXT.md`](./AI_CONTEXT.md) for the full rundown. `cv/` was out of scope and is unaffected.

## Candidate Technical Improvements (not committed — for discussion only)

Surface these to the user before acting on any of them:

- Fix the CV page's broken `../js/` script path.
- Decide whether to unify the main site and CV page onto a single vendored Bootstrap version — the gap widened this session (5.3.8 vs. 4.6.0, now a major-version difference).
- Run a dedicated accessibility/performance review pass on the new Liquid Glass design (contrast of `--text-secondary` against translucent glass surfaces, general a11y audit) — a reasonable follow-up given the scope of this refactor, not yet scheduled.
- Confirm whether the GTM container ID/script-snippet change that landed alongside the refactor (see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) § Google Tag Manager) was intentional.

## Adding a Roadmap Item

When the user commits to a planned feature or improvement, add it here with a short description and status (planned / in progress / blocked) rather than leaving it only in session history — `docs-maintainer` should keep this file's status current once work starts.
