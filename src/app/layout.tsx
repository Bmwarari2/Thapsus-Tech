import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { JsonLd, organisationJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Thapsus · Custom software built around your business",
    template: "%s · Thapsus",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: "Thapsus · Custom software built around your business",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

/** Accent colours come from src/config/site.ts so they can be changed in one place. */
const brandVars = {
  "--accent": site.brand.accent,
  "--accent-hover": site.brand.accentHover,
  "--accent-on-dark": site.brand.accentOnDark,
  "--accent-on-dark-hover": site.brand.accentOnDarkHover,
  "--accent-wash": site.brand.accentWash,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={inter.variable} style={brandVars} suppressHydrationWarning>
      <head>
        {/* Marks that JavaScript is running before first paint, so enhanced layouts never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <MotionProvider>
          <ConsentProvider>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
          </ConsentProvider>
        </MotionProvider>
        <JsonLd data={organisationJsonLd()} />
      </body>
    </html>
  );
}
