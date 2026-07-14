# COMPONENTS.md — Reusable Sections & Vendor Plugin Usage

There's no component framework here — "components" means recurring markup patterns and the vendor plugins that drive them. Reuse these patterns before introducing a new one.

## Main Site (`index.html` / `assets/`)

### Header / Nav (`#header`)
- Header fills the viewport height and condenses into a sticky top bar on tab switch (`.is-condensed`, see [`ARCHITECTURE.md`](./ARCHITECTURE.md#navigation-behavior)). Animated role text via **Typed.js** (`<span class="typing">`) — the typed strings are configured in an inline `<script>` in `index.html` itself, not in `main.js`; check `index.html` before adding a new typed-role feature.
- `.nav-menu` (desktop) is cloned at runtime into `.mobile-nav` (mobile) by `main.js` — never hand-write separate mobile nav markup; extend `.nav-menu` and the mobile version follows automatically.
- Social links and all other icon usage across the site use **Bootstrap Icons** (`<i class="bi bi-...">`) — the sole icon set (see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md)).

### Data-driven text (`assets/js/data.js`)
- A single `data` object (name, job title, contact info, "years of experience" figures) is injected into the DOM by **class name**, not by ID or a templating engine: `setValueByClassName('fullname', data.fullName)` finds *all* elements with that class name (not just the first) and sets each one's `innerHTML`; `setHrefByClassName` does the same for `href`. This lets the same field (e.g. `email`, `mail-to`) be bound in more than one place — e.g. both the About block and the new Contact section.
- To surface a new personal-data field somewhere on the page: add it to the `data` object in `data.js`, add a `setValueByClassName`/`setHrefByClassName` call, and give the target element(s) the matching class name. This is the project's only "data binding" mechanism — don't introduce a second one for a new field.

### Tab navigation (`.is-active` / nav)
- See [`ARCHITECTURE.md`](./ARCHITECTURE.md#navigation-behavior). A new top-level page section should be a `<section id="...">` added to both the DOM and the `.nav-menu` list — `main.js`'s existing click handler picks it up automatically, no JS changes needed for a plain new section. A `<footer>`-style always-visible element should stay outside the `<section id="...">` set (no `id`) so it isn't caught by the tab toggle.

### Scroll reveal (`assets/js/reveal.js`)
- Add `data-reveal="up"` (or `"left"`/`"right"`) to an element to have it fade/slide into view once scrolled into the viewport — a small vanilla `IntersectionObserver` script, no jQuery/library dependency. One-shot per element; respects `prefers-reduced-motion` by revealing everything immediately instead of animating. Reuse this attribute-driven pattern for new on-scroll reveals rather than adding an animation library (the previous `data-aos` attributes were dead markup with no library behind them and have been replaced by this mechanism).

### Glass design system (`assets/css/style.css`)
- `.glass-card` — the frosted-glass panel used for the About/Education/Experience/Contact cards (backdrop blur+saturate, translucent bg/border, inset highlight, solid-color `@supports` fallback for browsers without `backdrop-filter`).
- `.btn-glass` — black-translucent pill button, built on Bootstrap 5's per-component `--bs-btn-*` variable API rather than a hand-rolled class.
- `.badge-glass`, `.icon-chip` — small glass-styled badge/icon-circle helpers used in the Education/Experience/Contact cards.
- See [`UI_GUIDELINES.md`](./UI_GUIDELINES.md) for the underlying design-token layer these classes consume.

## Now-Removed Components

The portfolio grid (Isotope + Venobox), testimonials carousel (Owl Carousel), animated counters (jQuery CounterUp), skill-bar scroll animation (jQuery Waypoints), and the PHP contact-form scaffold (`php-email-form`) were all vendor plugins loaded with no matching page content, and were removed entirely (not just left unused) in the 2026-07-14 visual refactor — the vendored files no longer exist. If any of these features are wanted again, they'll need to be re-vendored from scratch; don't assume leftover initialization code still exists to hook into.

## CV Sub-Page (`cv/`)

The CV page (`cv/index.html`) is visually and structurally independent from the main site — it has its own `cv/css/site.css` and its own vendored Bootstrap/Font Awesome (see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md)). It reuses `assets/js/data.js`'s class-name-based data injection for personal details (`fullname`, `donet-years`, etc.), so the same "add a field to `data.js`, tag an element with the matching class" pattern applies there too. Don't duplicate `data.js`'s content into the CV page directly.

## Adding a New Section/Component

1. Check this file and `assets/js/main.js` for an existing pattern (nav-driven tab section, data-class binding, `data-reveal` scroll animation, glass card/badge/chip styling) before writing new JS or CSS.
2. Reuse an already-vendored plugin (see [`FRAMEWORK_NOTES.md`](./FRAMEWORK_NOTES.md) for the full inventory) instead of adding a new one for the same job.
3. Keep styling in `assets/css/style.css` (or `cv/css/site.css` for the CV page) — don't introduce inline `<style>` blocks or a new stylesheet file for a single section.
