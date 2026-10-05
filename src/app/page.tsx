import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { ToolsShowcase } from "@/components/home/ToolsShowcase";

export const metadata: Metadata = {
  title: { absolute: "Thapsus · Custom software built around your business" },
  description:
    "Replace the subscriptions you barely use with software built around how your business works. Custom CRMs, booking systems, job management and client portals from Thapsus in Stockport.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <ToolsShowcase />
      <FinalCta />
    </>
  );
}
