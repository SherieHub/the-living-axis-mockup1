/**
 * Motion tokens for Mockup 1.
 *
 * This concept is deliberately SLOWER than Mockup 2 (which runs 150–250ms).
 * The pacing is part of the editorial character: things settle rather than snap.
 *
 *   Section entrance : 14px fade-and-rise, 320ms, once, never re-triggering
 *   Buttons / links  : 250ms
 *   Image hover      : scale 1.03 over 900ms — drift, not zoom
 *   Header swap      : 300ms cross-fade
 *   Accordion        : 240ms height + 180ms content fade
 *
 * No parallax, bounce, autoplay, animated gradients, or decorative motion.
 *
 * REDUCED MOTION: Layout wraps the app in <MotionConfig> and collapses every
 * duration to zero when the user asks for reduced motion. Because these
 * variants carry NO transition of their own, that config is authoritative —
 * which is what guarantees no element is ever left stranded at opacity: 0
 * because its animation was suppressed.
 */

export const EASE_EDITORIAL = [0.22, 0.61, 0.36, 1] as const;

/** Section entrance. Deliberately carries no `transition` — see above. */
export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const revealTransition = {
  duration: 0.32,
  ease: EASE_EDITORIAL,
};

/** Standard viewport trigger: fires once, never again on scroll-up. */
export const revealViewport = { once: true, margin: '-80px' } as const;
