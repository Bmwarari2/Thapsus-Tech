import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { OneSystem } from "@/components/home/OneSystem";
import { Problem } from "@/components/home/Problem";
import { Savings } from "@/components/home/Savings";
import { Testimonials } from "@/components/home/Testimonials";
import { ToolsShowcase } from "@/components/home/ToolsShowcase";
import { TrustBento } from "@/components/home/TrustBento";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";

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
      <OneSystem />
      <ToolsShowcase />
      <WhatWeBuild />
      <HowItWorks />
      <Savings />
      <TrustBento />
      <Testimonials />
      <FinalCta />
    </>
  );
}
