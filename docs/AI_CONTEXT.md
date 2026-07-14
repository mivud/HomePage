# AI_CONTEXT.md — Restore Point

Read this second, right after `.claude/CLAUDE.md`, at the start of every session — it's the compact summary of where this project stands.

## What This Project Is

A static personal portfolio/homepage (plain HTML/CSS/JS, no framework, no backend) for Minh D. Vu, hosted on GitHub Pages at `hnim.info`. See [`PROJECT.md`](./PROJECT.md) for the full overview.

## Current Status (as of 2026-07-14)

The `.claude/` AI ecosystem was just synchronized to match this project's actual stack — it had been copied in from a prior Next.js/ASP.NET project and referenced technologies (React, TypeScript, ASP.NET Core, REST APIs, database migrations, shadcn/ui) that don't exist here. Agents/skills/workflows for those layers were removed or genericized; `docs/` was created from scratch (it didn't exist before this sync).

## Known Limitations

- **No build tooling** — no bundler, linter, formatter, or test runner. Verification of a change is manual (open the page in a browser).
- **No package manager** — third-party libraries are vendored as committed files, not installed dependencies. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).
- **Two out-of-sync Bootstrap copies** — main site uses 4.4.1, the CV page uses its own vendored 4.6.0. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).
- **`cv/index.html` references a script path that doesn't resolve** (`../js/jquery.min.js`, `../js/data.js` — no top-level `js/` directory exists). Not yet fixed; flag before touching it. See [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md).
- **`index.html`'s meta description is empty and has a typo in the attribute name** (`descriptison`). See [`UI_GUIDELINES.md`](./UI_GUIDELINES.md).
- **Vendor plugins loaded with no corresponding page content** — Owl Carousel (testimonials) and Isotope/Venobox (portfolio) initialize in `assets/js/main.js` against sections that don't currently exist in `index.html`. Dead weight, not a functional bug. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) and [`COMPONENTS.md`](./COMPONENTS.md).
- **No accessibility audit has been performed** — see [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) for specific gaps already spotted (reduced-motion handling, icon-only control labeling not yet verified).

None of the above have been fixed as part of this sync — they're documented so a future session doesn't have to rediscover them, and so any fix is a deliberate, requested change rather than an incidental one.

## Key Decisions

- Keep the project dependency-free (no build step, no package manager) unless the user explicitly decides otherwise — this is a deliberate simplicity trade-off, not an oversight.
- Treat the main site and the CV sub-page as two independent surfaces (separate vendored Bootstrap, separate stylesheets) rather than unifying them, unless asked to.

## Priorities

None currently tracked — see [`ROADMAP.md`](./ROADMAP.md). Ask the user what's next rather than assuming.
