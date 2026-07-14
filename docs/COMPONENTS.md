# COMPONENTS.md — Reusable Sections & Vendor Plugin Usage

There's no component framework here — "components" means recurring markup patterns and the vendor plugins that drive them. Reuse these patterns before introducing a new one.

## Main Site (`index.html` / `assets/`)

### Header / Nav (`#header`)
- Fixed-position header with animated role text via **Typed.js** (`<span class="typing">`, configured in `assets/js/main.js` if extended — currently the typed strings live inline; check `main.js` before adding a new typed-role feature).
- `.nav-menu` (desktop) is cloned at runtime into `.mobile-nav` (mobile) by `main.js` — never hand-write separate mobile nav markup; extend `.nav-menu` and the mobile version follows automatically.
- Social links use **Boxicons** (`<i class="bx bx-...">`).

### Data-driven text (`assets/js/data.js`)
- A single `data` object (name, job title, contact info, "years of experience" figures) is injected into the DOM by **class name**, not by ID or a templating engine: `setValueByClassName('fullname', data.fullName)` finds the first element with class `fullname` and sets its `innerHTML`.
- To surface a new personal-data field somewhere on the page: add it to the `data` object in `data.js`, add a `setValueByClassName`/`setHrefByClassName` call, and give the target element the matching class name. This is the project's only "data binding" mechanism — don't introduce a second one for a new field.

### Section reveal (`.section-show` / nav)
- See [`ARCHITECTURE.md`](./ARCHITECTURE.md#navigation-behavior). A new top-level page section should be a `<section id="...">` added to both the DOM and the `.nav-menu` list — `main.js`'s existing click handler picks it up automatically, no JS changes needed for a plain new section.

### Skill/experience bars (`#experience`)
- Bootstrap `.progress`/`.progress-bar` markup with `aria-valuenow` set on the bar. **jQuery Waypoints** triggers a callback when `.skills-content` scrolls into view, which then sets each bar's CSS `width` from its `aria-valuenow` (the animated "fill in" effect). Reuse this pattern for any new animated-on-scroll numeric bar rather than adding a new scroll-observer library.

### Animated counters (template-wide utility, not currently rendered on `index.html`)
- **jQuery CounterUp** (`counterup.min.js`) is initialized in `main.js` against `[data-toggle="counter-up"]`. If a stats/counter block is added back to the page, use this existing initialization rather than hand-rolling a counting animation.

### Portfolio grid (vendor plugins loaded, no current `#portfolio` section)
- **Isotope** (`.portfolio-container` / `.portfolio-item`, filterable via `#portfolio-flters`) + **Venobox** (`.venobox` class for lightbox behavior) are wired up in `main.js` and ready to use if a portfolio/gallery section is (re)added — don't add a competing grid/lightbox library.

### Testimonials carousel (vendor plugin loaded, no current `#testimonials` section)
- **Owl Carousel** is initialized against `.testimonials-carousel` with a responsive breakpoint config (1 item <768px, 2 at 768px, 3 at 900px+) in `main.js`. Reuse this initialization if testimonials return.

### Contact/email form (vendor plugin present)
- `assets/vendor/php-email-form/validate.js` handles client-side validation/submission wiring for a form posting to a PHP endpoint — this is the template's default contact-form mechanism if one is added; it does not currently point at a live endpoint on this site.

## CV Sub-Page (`cv/`)

The CV page (`cv/index.html`) is visually and structurally independent from the main site — it has its own `cv/css/site.css` and its own vendored Bootstrap/Font Awesome (see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md)). It reuses `assets/js/data.js`'s class-name-based data injection for personal details (`fullname`, `donet-years`, etc.), so the same "add a field to `data.js`, tag an element with the matching class" pattern applies there too. Don't duplicate `data.js`'s content into the CV page directly.

## Adding a New Section/Component

1. Check this file and `assets/js/main.js` for an existing pattern (nav-driven section, data-class binding, scroll-triggered animation, carousel/grid/lightbox) before writing new JS.
2. Reuse an already-vendored plugin (see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for the full inventory) instead of adding a new one for the same job.
3. Keep styling in `assets/css/style.css` (or `cv/css/site.css` for the CV page) — don't introduce inline `<style>` blocks or a new stylesheet file for a single section.
