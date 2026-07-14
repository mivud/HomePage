# DEVELOPER_GUIDE.md — Coding Standards & Conventions

## No Build Step

There is no `package.json`, bundler, linter, formatter, or test runner in this project. Changes are made directly to the HTML/CSS/JS files and verified by opening the page in a browser (locally via a static file server, or by pushing to the GitHub Pages branch). Don't introduce a build tool, npm, or a framework as a side effect of an unrelated change — that's a deliberate, discussed decision, not an incidental one.

## JavaScript Conventions

- `assets/js/main.js` wraps its code in an IIFE taking `jQuery` as `$` (`!(function($) { "use strict"; ... })(jQuery);`) — follow this pattern for new script files that use jQuery, rather than relying on the global `$`.
- `assets/js/data.js` is plain vanilla JS (no jQuery) using `getElementsByClassName` + direct DOM property assignment (`.innerHTML`, `.href`) — this file's job is narrowly "inject personal data by class name" (see [`COMPONENTS.md`](./COMPONENTS.md)); keep new data-driven fields following that same pattern rather than adding a templating layer.
- `assets/js/reveal.js` follows the same "small, single-purpose, no jQuery" convention as `data.js` (plain `IntersectionObserver`, no external library) — prefer this pattern for a new self-contained behavior script rather than adding it to `main.js` or pulling in a library.
- No module system (no ES modules, no CommonJS) — scripts communicate via globals (`jQuery`, `data`) and DOM state, loaded via plain `<script>` tags in a specific order (see [`ARCHITECTURE.md`](./ARCHITECTURE.md)). If a new script depends on jQuery or another vendor library, place its `<script>` tag after that dependency.
- Prefer `const`/`let` and strict equality (`===`) in any new code, even though the existing vendor/template code predates that convention — don't rewrite vendor files to match, but hold new first-party code to it.

## HTML Conventions

- Section-based structure: each major page region is a `<section id="...">` (see [`ARCHITECTURE.md`](./ARCHITECTURE.md)). A new top-level section should follow this pattern so the existing nav/section-toggle JS picks it up without changes.
- Class names generally follow the BootstrapMade template's existing naming (kebab-case, descriptive: `.about-me`, `.section-title`, `.nav-menu`) — match this style for new markup rather than introducing a different naming convention (e.g. BEM) in one corner of the page.
- Bootstrap grid/utility classes (`container`, `row`, `col-lg-*`, `d-none d-lg-block`, etc.) are used directly in markup — prefer them over new custom CSS for layout/visibility whenever they already cover the need.

## CSS Conventions

- One stylesheet per page/surface (`assets/css/style.css` for the main site, `cv/css/site.css` for the CV page) — see [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) for the typography/color/breakpoint conventions those files follow.
- The main site's colors, blur/shadow values, and font stack are CSS custom properties in `assets/css/style.css`'s `:root` block — add a new value there and reference it via `var(--token-name)` rather than hard-coding a new literal, matching the existing "design tokens" pattern (see [`UI_GUIDELINES.md`](./UI_GUIDELINES.md#design-tokens)). The CV page has no such token layer — it's a separate surface with its own conventions.
- Vendor CSS (`assets/vendor/*`, `cv/lib/*`) is never edited directly — any override belongs in the site's own stylesheet, which loads after vendor CSS in both `index.html` and `cv/index.html`.

## Adding a Vendor Library

- Vendor libraries are added by dropping the built files under `assets/vendor/<library-name>/` (main site) — there's no install command. Before adding one, check [`COMPONENTS.md`](./COMPONENTS.md)/[`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) to confirm an already-vendored library doesn't already solve the need.
- Reference the new files from the relevant page's `<head>` (CSS) and end-of-`<body>` (JS), in dependency order, matching the existing pattern in `index.html`.

## Folder/File Placement

- Main site assets: `assets/{css,js,img,vendor}/`.
- CV page assets: `cv/{css,images,lib}/` — kept separate from `assets/` by design (see [`ARCHITECTURE.md`](./ARCHITECTURE.md)); don't merge the two asset trees as a side effect of an unrelated change.

## Related Docs

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — how the pages and their scripts/styles fit together.
- [`COMPONENTS.md`](./COMPONENTS.md) — reusable patterns to check before writing new markup/JS.
- [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) — design system specifics.
- [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) — vendored library versions and gotchas.
