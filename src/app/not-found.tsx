import type { Metadata } from "next";
import { ButtonLink, LinkMore } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="page-title" className="grid min-h-[70vh] place-items-center bg-white py-28 text-center">
      <div className="wrap">
        <p className="t-eyebrow text-accent">404</p>
        <h1 id="page-title" className="t-display mt-3">
          Page not found.
        </h1>
        <p className="t-lead mx-auto mt-5 max-w-[26em] text-graphite">
          The page you’re looking for has moved or doesn’t exist. Let’s get you somewhere useful.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
          <ButtonLink href="/" size="lg">
            Go to the home page
          </ButtonLink>
          <LinkMore href="/contact" className="text-[17px]">
            Book a free review
          </LinkMore>
        </div>
      </div>
    </section>
  );
}
