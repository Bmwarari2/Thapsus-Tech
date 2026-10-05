/** Accessible FAQ list built on native disclosure elements. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="faq group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[19px] font-semibold tracking-[-0.015em] md:text-[21px] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-[20px] font-normal text-graphite transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="faq-body max-w-[40em] pb-7 pr-12 text-[17px] leading-[1.6] text-graphite">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
