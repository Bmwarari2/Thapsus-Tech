import { isPlaceholder, site } from "@/config/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** LocalBusiness structured data for Thapsus in Stockport. */
export function organisationJsonLd() {
  const { contact, legal } = site;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: legal.companyName,
    url: site.url,
    logo: `${site.url}/brand/thapsus-mark.png`,
    image: `${site.url}/opengraph-image.png`,
    description: site.description,
    telephone: contact.phoneHref,
    ...(isPlaceholder(contact.email) ? {} : { email: contact.email }),
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.locality,
      addressRegion: contact.region,
      addressCountry: contact.countryCode,
    },
    areaServed: { "@type": "Country", name: contact.serviceArea },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Companies House company number",
      value: legal.companyNumber,
    },
    knowsAbout: [
      "Custom software development",
      "CRM systems",
      "Booking systems",
      "Client portals",
      "ERP systems",
      "Website design",
    ],
  };
}
