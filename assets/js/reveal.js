/**
 * Scroll-reveal: adds `.is-visible` to any [data-reveal] element once it
 * enters the viewport. One-shot per element, no dependency on jQuery.
 * Respects prefers-reduced-motion by revealing everything immediately.
 */
(function () {
  "use strict";

  var elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
