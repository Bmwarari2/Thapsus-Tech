"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Lockup } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { useLenis } from "@/components/motion/MotionProvider";
import { mainNav, primaryCta } from "@/content/navigation";
import { useOverDark } from "@/lib/use-over-dark";

export function SiteHeader() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [openedFor, setOpenedFor] = useState(pathname);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu after navigating.
  if (open && openedFor !== pathname) {
    setOpen(false);
  }
  // Dark translucent header while a dark section sits beneath it.
  const overDark = useOverDark(26);
  const dark = overDark && !open;

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock scrolling, trap focus and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
      const items = [toggleRef.current, ...Array.from(focusables)].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open, lenis, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div
        className={`relative z-20 h-[var(--nav-height)] border-b transition-[background-color,border-color,color] duration-500 ${
          open
            ? "border-transparent bg-white text-ink"
            : dark
              ? "on-dark border-white/[0.08] bg-[rgba(22,22,23,0.72)] text-white backdrop-blur-[20px] backdrop-saturate-[180%]"
              : "border-black/[0.08] bg-white/[0.72] text-ink backdrop-blur-[20px] backdrop-saturate-[180%]"
        }`}
      >
        <nav aria-label="Main" className="wrap flex h-full items-center gap-7">
          <Link href="/" className="text-[19px]" aria-label="Thapsus home">
            <Lockup />
          </Link>

          <ul className="ml-auto hidden items-center gap-7 text-[14px] lg:flex">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`transition-[color,opacity] duration-200 hover:opacity-100 ${
                    isActive(item.href) ? "opacity-100" : "opacity-75"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ButtonLink href={primaryCta.href} size="sm" tone={dark ? "dark" : "light"} className="ml-auto lg:ml-0">
            {primaryCta.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => {
              setOpenedFor(pathname);
              setOpen((v) => !v);
            }}
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                  open ? "top-[5px] rotate-45" : "top-[1px]"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                  open ? "top-[5px] -rotate-45" : "top-[9px]"
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        ref={panelRef}
        data-lenis-prevent
        hidden={!open}
        className="fixed inset-x-0 top-0 z-10 h-dvh overflow-y-auto bg-white pt-[var(--nav-height)] lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap pb-12 pt-6">
          <ul className="flex flex-col">
            {[...mainNav, { href: "/", label: "Home" }].map((item, i) => (
              <li
                key={item.href}
                className="rise border-b border-line/70"
                style={{ ["--d" as string]: `${60 + i * 40}ms`, ["--rise-from" as string]: "12px" }}
              >
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block py-4 text-[28px] font-semibold tracking-[-0.025em] text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="rise mt-8" style={{ ["--d" as string]: "320ms" }}>
            <ButtonLink href={primaryCta.href} size="lg" className="w-full">
              {primaryCta.long}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
