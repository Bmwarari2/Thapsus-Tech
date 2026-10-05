/**
 * Testimonials. These are DRAFTS written from each project for the client to
 * approve or edit. A quote only appears on the site once `approved` is true,
 * which should mean the client has confirmed the exact wording. Publishing
 * words a client hasn't signed off would be a fake review under UK consumer law.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Director, Heritage Global Solutions" */
  role: string;
  /** Links the quote to its case study on /work. */
  caseStudy?: string;
  approved: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Every order now runs through one system, from the first RFQ to the shipping paperwork. Dispatch takes one click, and the invoices and packing list are ready straight away.",
    name: "Heritage Global Solutions",
    role: "Industrial sourcing and export, Preston",
    caseStudy: "heritage",
    approved: false,
  },
  {
    quote:
      "We used to track tenders, manufacturer letters and deadlines by hand. Now new tenders come to us, deadlines are flagged well in advance, and our bid documents are ready when we need them.",
    name: "Cebuka",
    role: "Mining supply, Tanzania",
    caseStudy: "cebuka",
    approved: false,
  },
  {
    quote:
      "Every person who responds on a Sunday now gets followed up. Our shepherds know exactly who to call and what to do next, straight from their phones.",
    name: "Potter’s House Church",
    role: "Discipleship team",
    caseStudy: "potters-house",
    approved: false,
  },
];

export const approvedTestimonials = testimonials.filter((t) => t.approved);
