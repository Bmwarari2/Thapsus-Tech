import Link from "next/link";
import { Lockup } from "@/components/brand/Logo";
import { footerNav } from "@/content/navigation";
import { isPlaceholder, site } from "@/config/site";

export function SiteFooter() {
  const { contact, legal } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mist text-[12px] leading-[1.6] text-graphite">
      <div className="wrap pb-8 pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line pb-8 md:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-2 text-[12px] font-semibold text-ink">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-[3px] transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {group.title === "Legal" ? (
                  <li>
                    <button
                      type="button"
                      data-cookie-settings
                      className="inline-block cursor-pointer py-[3px] text-left transition-colors hover:text-ink"
                    >
                      Cookie settings
                    </button>
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="mb-2 text-[12px] font-semibold text-ink">Contact</h2>
            <ul>
              <li>
                <a href={`tel:${contact.phoneHref}`} className="inline-block py-[3px] transition-colors hover:text-ink">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                {isPlaceholder(contact.email) ? (
                  <span className="inline-block py-[3px]">{contact.email}</span>
                ) : (
                  <a href={`mailto:${contact.email}`} className="inline-block py-[3px] transition-colors hover:text-ink">
                    {contact.email}
                  </a>
                )}
              </li>
              <li className="py-[3px]">
                {contact.locality}, {contact.region}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <p>
              Copyright © {year} {legal.tradingName}. Custom software for businesses across the UK, built in Stockport.
            </p>
            <p>
              {legal.tradingName} is a trading name of {legal.companyName}, registered in {legal.registeredIn}, company number{" "}
              {legal.companyNumber}. Registered office: {legal.registeredOffice}.
            </p>
          </div>
          <Link href="/" aria-label="Thapsus home" className="shrink-0 text-[15px] text-ink">
            <Lockup markClassName="h-[17px] w-[18px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
