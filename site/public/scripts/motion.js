/* Plenivostudio motion layer — vanilla JS, no dependencies.
 * Auto-initializes on DOMContentLoaded.
 *
 * API (all attributes are opt-in, progressive enhancement):
 *   data-tilt                  3D perspective tilt following the mouse.
 *   data-tilt-max="10"         Max tilt in degrees (default 10, clamped 2–25).
 *                              Hover/fine-pointer only; no JS errors otherwise.
 *   data-reveal                Scroll reveal; fades in when intersecting.
 *   data-reveal="up|left|right|scale"   Direction variant (default: up).
 *   data-reveal-delay="0-400"  Stagger delay in ms (clamped 0–800).
 *                              Hidden state is applied via `js-motion` on <html>
 *                              so content stays visible when JS fails.
 *   data-stack                 Pure-CSS 3D paper-stack hover (no JS needed).
 *   data-scrub                 Scroll-scrub 3D: maps the parent <section>'s
 *                              scroll progress (0→1 as it travels through the
 *                              viewport) to rotateY(-14deg→14deg) plus
 *                              translateY(30px→-30px), slow and eased.
 *                              Fine-pointer only (off on touch/coarse).
 *                              Do not combine with data-tilt on one element
 *                              (both write the same transform).
 *
 * Disabled entirely under prefers-reduced-motion.
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function boot() {
    initReveal();
    if (finePointer) {
      initTilt();
      initScrub();
    }
  }
  // Full page loads (deferred scripts run before DOMContentLoaded).
  document.addEventListener('DOMContentLoaded', boot);
  // Astro View Transitions: client-side navigations swap the DOM without a
  // reload, so boot again for the new document. Per-element guards inside
  // each init make repeat boots safe.
  document.addEventListener('astro:page-load', boot);

  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    // `js-motion` gates the hidden state in CSS: no JS, no hiding.
    document.documentElement.classList.add('js-motion');

    if (!('IntersectionObserver' in window)) {
      showAll(els);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) {
      if (el.__motionReveal) return;
      el.__motionReveal = true;
      var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      if (isFinite(d) && d > 0) el.style.transitionDelay = Math.min(d, 800) + 'ms';
      io.observe(el);
    });
  }

  function showAll(els) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* data-scrub: scroll-scrub 3D for an element inside a tall section.
   * Progress 0→1 = the section's journey through the viewport (section top
   * hits viewport bottom → section bottom exits viewport top). Mapped to
   * rotateY(-14deg→14deg) + translateY(30px→-30px) with a slow 0.075 ease
   * per rAF frame so it feels buttery, not snappy. IntersectionObserver
   * starts/stops the loop per section; siblings in one section share an
   * observer entry. Fine-pointer only (init is gated by the caller);
   * prefers-reduced-motion exits the whole module at the top. */
  function initScrub() {
    var els = document.querySelectorAll('[data-scrub]');
    if (!els.length) return;

    var items = [];
    Array.prototype.forEach.call(els, function (el) {
      if (el.__motionScrub) return;
      el.__motionScrub = true;
      el.style.willChange = 'transform';
      items.push({
        el: el,
        stage: el.closest('section') || el.parentElement,
        active: false,
        cur: null, // snapped to current progress on first activation: no jump
        raf: 0
      });
    });

    function progressOf(item) {
      var r = item.stage.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var span = vh + r.height;
      if (span <= 0) return 0;
      var p = (vh - r.top) / span;
      return Math.max(0, Math.min(1, p));
    }

    function frame(item) {
      item.raf = 0;
      if (!item.el.isConnected) { item.active = false; return; } // stage discarded by a view transition
      var target = progressOf(item);
      item.cur += (target - item.cur) * 0.075;
      var ry = (-14 + 28 * item.cur).toFixed(2);
      var ty = (30 - 60 * item.cur).toFixed(1);
      item.el.style.transform =
        'perspective(1000px) rotateY(' + ry + 'deg) translateY(' + ty + 'px)';
      if (item.active) {
        item.raf = requestAnimationFrame(function () { frame(item); });
      }
    }

    function start(item) {
      if (item.active) return;
      item.active = true;
      item.cur = progressOf(item);
      if (!item.raf) item.raf = requestAnimationFrame(function () { frame(item); });
    }

    function stop(item) {
      item.active = false; // the pending frame exits the loop on its own
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback: drive continuously (rAF pauses automatically in hidden tabs)
      items.forEach(function (item) {
        item.active = true;
        item.cur = progressOf(item);
        item.raf = requestAnimationFrame(function () { frame(item); });
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var targets = entry.target.__scrubItems;
        if (!targets) return;
        targets.forEach(function (item) {
          if (entry.isIntersecting) start(item); else stop(item);
        });
      });
    });

    // Group items by stage so siblings in one section share an observer entry
    var stages = [];
    items.forEach(function (item) {
      var s = item.stage;
      if (!s.__scrubItems) { s.__scrubItems = []; stages.push(s); }
      s.__scrubItems.push(item);
    });
    stages.forEach(function (s) { io.observe(s); });
  }

  function initTilt() {
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      if (el.__motionTilt) return;
      el.__motionTilt = true;
      var max = parseFloat(el.getAttribute('data-tilt-max') || '10');
      if (!isFinite(max)) max = 10;
      max = Math.max(2, Math.min(max, 25));

      var rafId = null;

      el.addEventListener('mouseenter', function () {
        el.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease-out';
      });

      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        var px = (ev.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
        var py = (ev.clientY - r.top) / r.height - 0.5;

        if (rafId) return;
        rafId = requestAnimationFrame(function () {
          rafId = null;
          var ry = (px * max * 2).toFixed(2);
          var rx = (-py * max * 2).toFixed(2);
          el.style.transform =
            'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
          // Soft dynamic shadow leaning opposite the tilt;
          // deepened when the dark theme is active.
          var dark = document.documentElement.getAttribute('data-theme') === 'dark';
          var c1 = dark ? 'rgba(0,0,0,0.5)' : 'rgba(22,24,29,0.14)';
          var c2 = dark ? 'rgba(0,0,0,0.3)' : 'rgba(22,24,29,0.08)';
          var ox = (-px * 18).toFixed(1);
          var oy = (18 + -py * 18).toFixed(1);
          el.style.boxShadow =
            ox + 'px ' + oy + 'px 48px ' + c1 + ', ' +
            (ox / 2) + 'px ' + (oy / 2) + 'px 14px ' + c2;
        });
      });

      el.addEventListener('mouseleave', function () {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        el.style.transition = 'transform 0.45s cubic-bezier(0.22,0.61,0.36,1), ' +
          'box-shadow 0.45s ease';
        el.style.transform = '';
        el.style.boxShadow = '';
      });
    });
  }
})();
