import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

// Inter stands in as the fallback for Neue Haas Grotesk.
const neueHaasFallback = Inter({
  variable: "--font-neue-haas",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brand Site",
  description: "Next.js + Sanity",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${neueHaasFallback.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand-white font-sans text-brand-black">
        {children}
      </body>
    </html>
  );
}
