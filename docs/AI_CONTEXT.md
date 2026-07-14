# AI_CONTEXT.md — Restore Point

Read this second, right after `.claude/CLAUDE.md`, at the start of every session — it's the compact summary of where this project stands.

## What This Project Is

A static personal portfolio/homepage (plain HTML/CSS/JS, no framework, no backend) for Minh D. Vu, hosted on GitHub Pages at `hnim.info`. See [`PROJECT.md`](./PROJECT.md) for the full overview.

## Current Status (as of 2026-07-14)

The main site (`index.html` + `assets/`) went through a full "Liquid Glass" visual refactor this session: Bootstrap 4.4.1→5.3.8, three vendored icon fonts (Boxicons/Icofont/Remixicon) consolidated into Bootstrap Icons, several dead vendor plugins removed entirely, a dark navy/green theme replaced with a light frosted-glass design-token system, a new Contact section and footer added, and two dormant data-binding bugs fixed. `cv/` was explicitly out of scope and is untouched. See [`PROJECT.md`](./PROJECT.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`COMPONENTS.md`](./COMPONENTS.md), [`UI_GUIDELINES.md`](./UI_GUIDELINES.md), and [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for the specifics.

(Earlier the same day, the `.claude/` AI ecosystem was synchronized to match this project's actual stack, replacing references to a prior Next.js/ASP.NET project. That sync is unaffected by the visual refactor — no agent/Skill/workflow content references the CSS framework or icon set.)

## Known Limitations

Still open:
- **No build tooling** — no bundler, linter, formatter, or test runner. Verification of a change is manual (open the page in a browser).
- **No package manager** — third-party libraries are vendored as committed files, not installed dependencies. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).
- **Two out-of-sync Bootstrap copies, gap now wider** — main site is 5.3.8, the CV page is still its own vendored 4.6.0 (a major-version gap, not just minor). See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).
- **`cv/index.html` references a script path that doesn't resolve** (`../js/jquery.min.js`, `../js/data.js` — no top-level `js/` directory exists). Not yet fixed; flag before touching it. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).
- **No formal accessibility audit has been performed** on the new design — several specific gaps (missing alt text, unlabeled icon-only controls, no reduced-motion handling) were fixed as part of this refactor, but no dedicated contrast/a11y pass has been run against the new light theme. See [`UI_GUIDELINES.md`](./UI_GUIDELINES.md).
- **An undocumented GTM ID/snippet change landed alongside the refactor** (container ID changed, a script snippet was added where only `<noscript>` existed before) — not part of the described visual refactor scope; flagged for user confirmation rather than assumed intentional. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).

Resolved by this session's refactor (previously tracked here, now fixed — kept as a record, not an open item):
- `index.html`'s meta description was empty with a typo in the attribute name (`descriptison`) — now filled in and corrected.
- The favicon's MIME type was mismatched — now correct.
- Owl Carousel (testimonials) and Isotope/Venobox (portfolio) loaded with no corresponding page content — those vendor directories were deleted entirely rather than left as dead weight.

## Key Decisions

- Keep the project dependency-free (no build step, no package manager) unless the user explicitly decides otherwise — this is a deliberate simplicity trade-off, not an oversight.
- Treat the main site and the CV sub-page as two independent surfaces (separate vendored Bootstrap, separate stylesheets) rather than unifying them, unless asked to.
- Nav mechanism is deliberately click-driven tabs, not scroll-anchoring — a true anchor-scroll + scroll-spy nav was built and reviewed during this session's refactor, then explicitly reverted back to the original click-driven, single-section-visible pattern (reskinned with a CSS fade/slide transition) per user feedback. Don't reintroduce scroll-anchoring without checking with the user first; see [`ARCHITECTURE.md`](./ARCHITECTURE.md#navigation-behavior).
- Design tokens (CSS custom properties in `assets/css/style.css`'s `:root`) are the intended single source of truth for color/blur/spacing values going forward — avoid reintroducing hard-coded literals for values a token already covers. See [`UI_GUIDELINES.md`](./UI_GUIDELINES.md).

## Priorities

None formally tracked — see [`ROADMAP.md`](./ROADMAP.md). A dedicated accessibility/performance review pass on the new design would be a natural next step given the scope of this refactor, but ask the user before starting it rather than assuming it's wanted now.
