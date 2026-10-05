export const mainNav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
] as const;

export const primaryCta = { href: "/contact", label: "Book a review", long: "Book a free software review" } as const;

export const footerNav = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions#crm", label: "CRM & sales" },
      { href: "/solutions#booking", label: "Booking & scheduling" },
      { href: "/solutions#jobs", label: "Job management" },
      { href: "/solutions#portals", label: "Client portals" },
      { href: "/solutions#erp", label: "ERP & operations" },
      { href: "/solutions", label: "All solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Book a review" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/cookies", label: "Cookie policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;
