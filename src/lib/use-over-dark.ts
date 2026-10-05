"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * True while a section marked `data-nav-theme="dark"` sits under the given
 * horizontal line (in px from the top of the viewport). Used by the sticky
 * bars to switch to their dark style over dark sections.
 */
export function useOverDark(line: number) {
  const pathname = usePathname();
  const [state, setState] = useState({ path: pathname, dark: false });

  // Reset when the page changes, until the new page's sections report in.
  if (state.path !== pathname) {
    setState({ path: pathname, dark: false });
  }

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const visible = new Set<Element>();
    const observe = () => {
      io?.disconnect();
      visible.clear();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
          setState((s) => ({ ...s, dark: visible.size > 0 }));
        },
        { rootMargin: `-${line}px 0px -${Math.max(0, window.innerHeight - line - 1)}px 0px` },
      );
      document.querySelectorAll('[data-nav-theme="dark"]').forEach((el) => io?.observe(el));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      window.removeEventListener("resize", observe);
      io?.disconnect();
    };
  }, [pathname, line]);

  return state.path === pathname && state.dark;
}
