/** Shared by the contact form (browser) and the API route (server). */

export const staffOptions = ["1–4", "5–10", "11–25", "26–50", "51–100", "101–200", "More than 200"] as const;
export const spendOptions = [
  "Under £250 a month",
  "£250–£500 a month",
  "£500–£1,000 a month",
  "£1,000–£2,500 a month",
  "£2,500–£5,000 a month",
  "Over £5,000 a month",
  "Not sure",
] as const;

export type Enquiry = {
  name: string;
  business: string;
  email: string;
  phone: string;
  staff: string;
  software: string;
  spend: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export const limits = { name: 100, business: 120, email: 160, phone: 30, software: 600, message: 3000 } as const;

export function validateEnquiry(data: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!data.name.trim()) errors.name = "Enter your name.";
  if (!data.business.trim()) errors.business = "Enter your business name.";
  if (!data.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL.test(data.email.trim())) errors.email = "Enter an email address like name@business.co.uk.";
  if (data.phone.trim() && !PHONE.test(data.phone.trim())) errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!staffOptions.includes(data.staff as (typeof staffOptions)[number])) errors.staff = "Choose roughly how many people work in your business.";
  if (!spendOptions.includes(data.spend as (typeof spendOptions)[number])) errors.spend = "Choose your approximate monthly software spend.";
  if (!data.consent) errors.consent = "Tick the box so we can reply to your enquiry.";
  (Object.keys(limits) as (keyof typeof limits)[]).forEach((key) => {
    if (data[key].length > limits[key]) errors[key] = "That’s a little long. Please shorten it.";
  });
  return errors;
}
