# UI_GUIDELINES.md — Design System & Conventions

## Typography

Three Google Fonts families loaded on both the main site and CV page:
- **Open Sans** — body copy.
- **Raleway** — headings/titles in several sections.
- **Poppins** — used across nav, section titles, and various UI labels.

Font choice is set per-selector in `assets/css/style.css` (there's no CSS custom-property/token layer — colors and fonts are hard-coded per rule). When styling something new, match the `font-family` already used by the nearest similar element rather than introducing a fourth family.

## Color

No `:root` CSS variable palette exists in `assets/css/style.css` — colors are literal hex values per selector. Before introducing a new color, search `assets/css/style.css` for a hex value already used for a similar purpose (accent, background, text) and reuse it rather than picking a new one, to avoid the palette drifting further.

## Responsive Breakpoints

The stylesheet's actual `@media` breakpoints (max-width unless noted):
- `min-width: 1024px` — desktop-specific rules.
- `992px` — tablet/small-desktop.
- `768px` — tablet/mobile.
- `767px` — mobile.

Bootstrap 4's own grid breakpoints (`sm`/`md`/`lg`/`xl` utility/grid classes) are also available via the vendored Bootstrap CSS and are used directly in markup (e.g. `d-none d-lg-block`, `col-lg-4`) — prefer a Bootstrap grid/utility class over a new custom `@media` rule when the existing grid breakpoints already cover the need.

## Accessibility

No formal accessibility audit has been run on this site. When touching UI:
- Keep interactive elements as native `<a>`/`<button>` rather than div/span with a click handler.
- Icon-only controls (e.g. the mobile nav toggle, social links using Boxicons/Icofont glyph classes) need an accessible name (`aria-label` or visually-hidden text) — check the current markup before assuming one exists.
- Images (`assets/img/`) should carry meaningful `alt` text; decorative images should use `alt=""`.
- The animated section-reveal/typed-text behavior (see [`ARCHITECTURE.md`](./ARCHITECTURE.md)) has no `prefers-reduced-motion` handling currently — flag this as a known gap rather than silently "fixing" it outside an explicitly requested a11y pass.

## Icons

Three icon sets are vendored and in active use — don't add a fourth for something one of these already covers:
- **Boxicons** (`bx bx-*`, `bx bxl-*`) — social links, some UI icons.
- **Icofont** (`icofont-*`) — mobile nav toggle and other UI glyphs.
- **Remixicon** — vendored and loaded; check current markup for actual usage before assuming it's the default choice for a new icon.

## SEO Basics

- Every page needs a real `<title>` and a non-empty meta description (`index.html`'s `<meta name="descriptison">` is currently empty and has a typo in the attribute name — see [`AI_CONTEXT.md`](./AI_CONTEXT.md) known limitations).
- Keep heading hierarchy sequential (`h1` → `h2` → `h3`) within each section rather than skipping levels for visual sizing — use CSS for size, not heading level.
- Prefer semantic sectioning elements (`<section>`, `<nav>`, `<header>`) — already the pattern in `index.html` — over generic `<div>`s for structural regions.

## Styling Conventions

- All page-specific CSS lives in `assets/css/style.css` (main site) or `cv/css/site.css` (CV page) — avoid inline `<style>` blocks (the one exception currently in `cv/index.html` should not be treated as the pattern to follow for new styles).
- Vendor CSS is never hand-edited — overrides belong in the site's own stylesheet, loaded after vendor CSS so cascade order does the overriding.
