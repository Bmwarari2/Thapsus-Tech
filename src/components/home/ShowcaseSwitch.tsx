"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { MQ } from "@/lib/motion";

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(MQ.desktop);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Renders the pinned story only on large screens with motion allowed, and the
 * stacked story everywhere else, so phones never carry the extra screens.
 * The server always sends the stacked version, which works without JavaScript.
 */
export function ShowcaseSwitch({ pinned, stacked }: { pinned: ReactNode; stacked: ReactNode }) {
  const desktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MQ.desktop).matches,
    () => false,
  );
  return <>{desktop ? pinned : stacked}</>;
}
