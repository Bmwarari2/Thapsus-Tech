/**
 * Client quotes. A quote only appears on the site while `approved` is true,
 * which should mean the client has confirmed the exact wording. Set it back
 * to false straight away if a client asks for a quote to be changed or removed.
 * `name` is the organisation for now; add the client contact’s name and job
 * title once they agree to be named.
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
    approved: true,
  },
  {
    quote:
      "We used to track tenders, manufacturer letters and deadlines by hand. Now new tenders come to us, deadlines are flagged well in advance, and our bid documents are ready when we need them.",
    name: "Cebuka",
    role: "Mining supply, Tanzania",
    caseStudy: "cebuka",
    approved: true,
  },
  {
    quote:
      "Every person who responds on a Sunday now gets followed up. Our shepherds know exactly who to call and what to do next, straight from their phones.",
    name: "Potter’s House Church",
    role: "Discipleship team",
    caseStudy: "potters-house",
    approved: true,
  },
];

export const approvedTestimonials = testimonials.filter((t) => t.approved);
