"use client";

import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type Motion = {
  gsap: typeof GSAP;
  ScrollTrigger: typeof ScrollTriggerType;
};

let motionPromise: Promise<Motion> | null = null;

/**
 * Loads GSAP + ScrollTrigger on demand, once. Keeping them out of the initial
 * bundle means the page is readable and interactive before any animation code
 * arrives.
 */
export function loadMotion(): Promise<Motion> {
  if (!motionPromise) {
    motionPromise = whenIdle().then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")])).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: "expo.out", duration: 1 });
        ScrollTrigger.config({ ignoreMobileResize: true });
        return { gsap, ScrollTrigger };
      },
    );
  }
  return motionPromise;
}

/** Resolves after the page has loaded and the main thread is free, so animation code never competes with first paint. */
function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 1500 }) : setTimeout(resolve, 200);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
}

/** Touch-first devices keep native scrolling; smooth scrolling is for mouse and trackpad. */
export function prefersNativeScroll(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Breakpoints shared by every animation, matching the CSS. */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

let refreshTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Animations are set up independently as components mount, so pinned sections
 * can be created after triggers further down the page. Re-sorting by page
 * position and refreshing once everything has settled keeps every trigger's
 * start and end exact.
 */
export function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    loadMotion().then(({ ScrollTrigger }) => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  }, 120);
}
