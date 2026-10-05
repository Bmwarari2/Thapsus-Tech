"use client";

import { useEffect, type RefObject } from "react";
import { loadMotion, scheduleRefresh, type Motion } from "./motion";

type Cleanup = void | (() => void);
type Setup = (motion: Motion, scope: HTMLElement) => Cleanup;

/**
 * Runs a GSAP setup function once the animation libraries have loaded.
 * Everything created inside is scoped to `scope` and reverted on unmount,
 * so selectors like ".caption" only match inside this component.
 */
export function useMotion(scope: RefObject<HTMLElement | null>, setup: Setup) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    let cancelled = false;
    let cleanup: Cleanup;
    let ctx: { revert: () => void } | undefined;

    loadMotion().then((motion) => {
      if (cancelled) return;
      ctx = motion.gsap.context(() => {
        cleanup = setup(motion, el);
      }, el);
      scheduleRefresh();
    });

    return () => {
      cancelled = true;
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // Setup functions are written inline and only need to run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
