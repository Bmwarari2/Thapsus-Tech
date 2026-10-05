import type { CSSProperties, ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "mist";
  id?: string;
};

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Opening block for inner pages: eyebrow, large headline and one-line lead. */
export function PageIntro({ eyebrow, title, lead, children, tone = "light", id = "page-title" }: Props) {
  return (
    <section
      aria-labelledby={id}
      className={`${tone === "mist" ? "bg-mist" : "bg-white"} pb-16 pt-16 text-center md:pb-24 md:pt-28`}
    >
      <div className="wrap">
        {eyebrow ? (
          <p className="t-eyebrow rise text-accent" style={delay(0)}>
            {eyebrow}
          </p>
        ) : null}
        <h1 id={id} className="t-display rise mx-auto mt-3 max-w-[12em] text-balance" style={delay(100)}>
          {title}
        </h1>
        {lead ? (
          <p className="t-lead rise mx-auto mt-6 max-w-[32em] text-graphite" style={delay(240)}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="rise mt-9" style={delay(360)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
