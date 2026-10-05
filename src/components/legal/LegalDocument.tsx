import type { ReactNode } from "react";
import { site } from "@/config/site";

type Props = {
  title: string;
  /** e.g. "5 October 2026" */
  updated: string;
  intro?: ReactNode;
  children: ReactNode;
};

/** Layout for privacy, cookie and terms pages: readable measure, clear headings. */
export function LegalDocument({ title, updated, intro, children }: Props) {
  return (
    <article className="bg-white pb-24 pt-16 md:pb-36 md:pt-24">
      <div className="wrap">
        <div className="mx-auto max-w-[44rem]">
          <p className="t-eyebrow text-accent">Legal</p>
          <h1 id="page-title" className="t-title mt-3">
            {title}
          </h1>
          <p className="t-caption mt-4 text-graphite">Last updated: {updated}</p>

          <aside
            role="note"
            className="mt-8 rounded-[var(--radius-tile-sm)] border border-[#f0d9a8] bg-[#fdf6e7] px-5 py-4 text-[15px] leading-[1.5] text-[#6b4a00]"
          >
            <strong className="font-semibold">Template for review.</strong> This document is a starting point written for{" "}
            {site.legal.companyName}. It is not legal advice. Please check it, fill in anything in [square brackets] and have it
            reviewed by a qualified professional before relying on it.
          </aside>

          {intro ? <div className="prose-legal mt-10">{intro}</div> : null}
          <div className="prose-legal mt-10">{children}</div>
        </div>
      </div>
    </article>
  );
}
