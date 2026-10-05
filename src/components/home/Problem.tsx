import { TextReveal } from "./TextReveal";

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-white py-28 md:py-44">
      <div className="wrap">
        <h2 id="problem-title" className="t-eyebrow text-graphite" data-reveal>
          The problem
        </h2>
        <TextReveal
          className="mt-6 max-w-[17em] text-[clamp(2.125rem,3.9vw+1rem,4.25rem)] font-bold leading-[1.08] tracking-[-0.03em]"
          text="You pay for every seat, every month, for software built for someone else’s business. Most of it, you never use."
        />
        <p className="t-lead mt-10 max-w-[28em] text-graphite md:mt-14" data-reveal>
          And the tools you do use don’t talk to each other. So the gaps get filled with spreadsheets, copy and paste, and
          late nights.
        </p>
      </div>
    </section>
  );
}
