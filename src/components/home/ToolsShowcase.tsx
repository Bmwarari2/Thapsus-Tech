import { Laptop } from "@/components/devices/Devices";
import { ScreenById, type ScreenId } from "@/components/mockups/ScreenById";
import { LinkMore } from "@/components/ui/Button";
import { showcaseTools } from "@/content/tools";
import { PinnedStory } from "./PinnedStory";
import { ShowcaseSwitch } from "./ShowcaseSwitch";

export function ToolsShowcase() {
  return (
    <section aria-labelledby="tools-title" data-nav-theme="dark" className="on-dark relative bg-black text-white">
      <div className="wrap pt-28 text-center md:pt-40">
        <p className="t-eyebrow text-accent-on-dark" data-reveal>
          Tools we build
        </p>
        <h2 id="tools-title" className="t-headline mt-3" data-reveal>
          Made for how you work.
        </h2>
        <p className="t-lead mx-auto mt-5 max-w-[30em] text-night-text" data-reveal>
          Every system is shaped around your business, so your team never has to work around it.
        </p>
      </div>

      <ShowcaseSwitch
        pinned={
          <PinnedStory
            items={showcaseTools.map(({ id, eyebrow, title, text, href }) => ({ id, eyebrow, title, text, href }))}
            screens={showcaseTools.map((tool) => (
              <ScreenById key={tool.id} id={tool.screen as ScreenId} />
            ))}
          />
        }
        stacked={<StackedStory />}
      />
      <div className="pb-24 md:pb-36" />
    </section>
  );
}

/* ── Phones, tablets and reduced motion: a calm stacked list ── */
function StackedStory() {
  return (
    <div className="scrolly-stacked wrap">
      {showcaseTools.map((tool) => (
        <article key={tool.id} className="pt-20 md:pt-28">
          <div data-reveal className="mx-auto max-w-[36em] text-center">
            <p className="t-eyebrow text-accent-on-dark">{tool.eyebrow}</p>
            <h3 className="t-title mt-3">{tool.title}</h3>
            <p className="t-lead mt-4 text-night-text">{tool.text}</p>
            <LinkMore href={tool.href} className="mt-5 inline-block">
              Learn more<span className="sr-only"> about {tool.eyebrow.toLowerCase()}</span>
            </LinkMore>
          </div>
          <div data-reveal className="relative mx-auto mt-10 max-w-[880px]">
            <div className="dv-glow" />
            <Laptop label={tool.label}>
              <ScreenById id={tool.screen as ScreenId} />
            </Laptop>
          </div>
        </article>
      ))}
      <p className="t-caption pt-8 text-center text-night-text">Screens show sample data.</p>
    </div>
  );
}
