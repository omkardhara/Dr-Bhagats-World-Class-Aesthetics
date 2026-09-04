import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StructuredData from "@/components/StructuredData";
import { BRAND, SITE_URL } from "@/lib/site";

import "./globals.css";

// Inter stands in as the fallback for Neue Haas Grotesk.
const neueHaasFallback = Inter({
  variable: "--font-neue-haas",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | Skin, Hair and Laser Clinic`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} | Skin, Hair and Laser Clinic`,
    description: BRAND.description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token Search Console gives
  // you under "HTML tag" verification. Omitted entirely when unset.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${neueHaasFallback.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-bone font-sans text-brand-black">
        <StructuredData />
        {children}
        {/* Cookieless, so no consent banner is required for these two. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
