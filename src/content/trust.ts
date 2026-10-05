import type { IconName } from "@/components/ui/Icon";

export const trustPoints: { icon: IconName; title: string; text: string }[] = [
  { icon: "data", title: "Your data stays yours.", text: "Export it whenever you like, in standard formats. It never belongs to us." },
  { icon: "shield", title: "Hosted in the UK.", text: "Secure, GDPR-compliant hosting, monitored and kept up to date by us." },
  { icon: "backup", title: "Daily backups.", text: "Kept for as long as you need them, so nothing is ever lost." },
  { icon: "unlock", title: "No lock-in.", text: "And if Thapsus ever closes, we hand over the code so your system keeps running." },
  { icon: "users", title: "Priced per plan.", text: "Not per seat. A new starter doesn’t come with a new bill." },
  { icon: "pin", title: "A local team.", text: "Based in Stockport. Real people who know your system, a phone call away." },
];
