# UI_GUIDELINES.md — Design System & Conventions

The main site uses a light "Liquid Glass" design system (introduced 2026-07-14, replacing a prior dark navy/green theme). The CV sub-page (`cv/`) is out of scope for this system — it keeps its own separate stylesheet/theme untouched.

## Typography

A single Google Fonts family, **Inter**, loaded on the main site (variable weights 300–700, italic 400) — it replaced the previous three-family Open Sans/Raleway/Poppins setup. `--font-body` (see Design Tokens below) is the one place font-family is set; don't introduce a second family for a new element.

## Design Tokens

`assets/css/style.css`'s `:root` block is the single source of truth for the visual system — reuse a token rather than a new literal value:
- `--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-saturate`, `--glass-filter`, `--glass-highlight`, `--glass-radius`, `--glass-shadow` — the frosted-glass look consumed by `.glass-card` and other glass surfaces (see [`COMPONENTS.md`](./COMPONENTS.md)).
- `--page-bg-top`/`--page-bg-bottom` — the body's top-to-bottom gradient background.
- `--text-primary`/`--text-secondary` — the two text colors used site-wide.
- `--pill-bg`/`--pill-bg-hover`/`--pill-fg` — `.btn-glass` pill button colors.
- Bootstrap 5 `--bs-*` overrides (body bg/color/font, link colors, border-radius) are set directly in the same block — this works without a Sass build because Bootstrap 5's compiled CSS already exposes these as CSS variables.

Before adding a new color or blur/shadow value, check whether an existing token already covers the need; add a new token to `:root` rather than a one-off literal if a genuinely new value is needed.

## Responsive Breakpoints

Bootstrap 5's grid breakpoints (`sm`/`md`/`lg`/`xl` utility/grid classes, e.g. `d-none d-lg-block`, `row-cols-md-3`) are used directly in markup and are the primary responsive mechanism. `assets/css/style.css` adds a small number of its own `max-width` breakpoints on top (e.g. `767.98px`, `575.98px`) for header/section-specific sizing — prefer a Bootstrap grid/utility class over a new custom `@media` rule when the existing grid breakpoints already cover the need.

## Accessibility

No formal accessibility audit has been run on this site, but the 2026-07-14 refactor fixed several previously-known gaps:
- The avatar image now has real `alt` text; icon-only links (social links, mobile nav toggle) have `aria-label`s; the mobile nav toggle has `aria-expanded`/`aria-controls` kept in sync with its state.
- Both the scroll-reveal effect (`assets/js/reveal.js`) and the tab-switch fade animation (`assets/css/style.css`'s `tab-fade-in` keyframe) now respect `prefers-reduced-motion` — this is no longer an open gap.
- Still open: no dedicated accessibility/contrast audit has been run against the new light theme (e.g. `--text-secondary` contrast against `--glass-bg` at low opacity) — flag this as a known gap rather than silently "fixing" it outside an explicitly requested a11y pass. See [`ROADMAP.md`](./ROADMAP.md).
- Keep interactive elements as native `<a>`/`<button>` rather than div/span with a click handler — unchanged guidance.

## Icons

**Bootstrap Icons** (`bi bi-*`) is the single icon set — it replaced three previously-vendored icon fonts (Boxicons, Icofont, Remixicon), which have been removed entirely. Don't add a second icon set; if `bi-*` doesn't have a needed glyph, flag it rather than vendoring another font.

## SEO Basics

- Every page needs a real `<title>` and a non-empty meta description — `index.html`'s meta description is now filled in with real content and the attribute-name typo (`descriptison`) is fixed.
- Keep heading hierarchy sequential (`h1` → `h2` → `h3`) within each section rather than skipping levels for visual sizing — use CSS for size, not heading level.
- Prefer semantic sectioning elements (`<section>`, `<nav>`, `<header>`, `<footer>`) — already the pattern in `index.html` — over generic `<div>`s for structural regions.

## Styling Conventions

- All page-specific CSS lives in `assets/css/style.css` (main site) or `cv/css/site.css` (CV page) — avoid inline `<style>` blocks (the one exception currently in `cv/index.html` should not be treated as the pattern to follow for new styles).
- Vendor CSS is never hand-edited — overrides belong in the site's own stylesheet, loaded after vendor CSS so cascade order does the overriding.
