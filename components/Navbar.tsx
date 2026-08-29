"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Technology", href: "/technology" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        {/* Horizontal brand logo placeholder — swap for an <Image /> when the asset lands. */}
        <Link href="/" className="flex items-center" aria-label="Home">
          <div className="flex h-8 w-40 items-center justify-center border border-brand-gray-muted/40 text-xs uppercase tracking-[0.3em] text-brand-white sm:w-48">
            Logo
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm uppercase tracking-[0.15em] text-brand-gray-light transition-colors hover:text-brand-champagne-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="hidden rounded-full bg-champagne-gradient px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-brand-white transition-opacity hover:opacity-90 md:inline-block"
          >
            Book Consultation
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="block h-px w-6 bg-brand-white" />
            <span className="block h-px w-6 bg-brand-white" />
            <span className="block h-px w-6 bg-brand-white" />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-brand-gray-muted/20 bg-brand-black md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm uppercase tracking-[0.15em] text-brand-gray-light hover:text-brand-champagne-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 pb-2">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-champagne-gradient px-6 py-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-brand-white"
            >
              Book Consultation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
