"use client";

import { ButtonLink } from "@/components/ui/Button";
import { primaryCta } from "@/content/navigation";
import { useOverDark } from "@/lib/use-over-dark";

type Props = {
  title: string;
  links?: { href: `#${string}`; label: string }[];
  cta?: { href: string; label: string };
};

/**
 * Product-style secondary bar: page title, in-page links and a pill CTA. Sticks
 * under the main nav on tablets and desktops. On those pages the main nav drops
 * its own CTA so it only appears once. Phones show the main nav only.
 */
export function SubNav({ title, links = [], cta = primaryCta }: Props) {
  const dark = useOverDark(52 + 24);

  return (
    <div
      data-subnav
      className={`sticky top-[var(--nav-height)] z-40 hidden border-b transition-[background-color,border-color,color] duration-500 md:block ${
        dark
          ? "on-dark border-white/[0.08] bg-[rgba(22,22,23,0.72)] text-white"
          : "border-black/[0.08] bg-white/[0.72] text-ink"
      } backdrop-blur-[20px] backdrop-saturate-[180%]`}
    >
      <nav aria-label={`${title} sections`} className="wrap flex h-[var(--subnav-height)] items-center gap-6">
        <a href="#main" className="truncate text-[19px] font-semibold tracking-[-0.02em] md:text-[21px]">
          {title}
        </a>
        {links.length ? (
          <ul className="ml-auto hidden items-center gap-6 text-[13px] md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="opacity-75 transition-opacity hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <ButtonLink href={cta.href} size="sm" tone={dark ? "dark" : "light"} className={links.length ? "ml-auto md:ml-0" : "ml-auto"}>
          {cta.label}
        </ButtonLink>
      </nav>
    </div>
  );
}
