"use client";

import Image from "next/image";
import Link from "next/link";

import { BRAND } from "@/lib/site";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Concerns", href: "/concerns" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /**
   * Transparent over the hero, solid once the page moves - the pattern every
   * luxury hotel site measured uses. It lets the hero image run to the top of
   * the viewport instead of being cropped by a bar.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        scrolled || open ? "bg-brand-black" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <Link
          href="/"
          className="-ml-2 flex min-h-11 items-center px-2"
          aria-label={BRAND.name}
        >
          {/* Light lockup: the navbar is always brand-black. */}
          <Image
            src="/brand/logo-horizontal-light.svg"
            alt={BRAND.name}
            width={204}
            height={57}
            priority
            className="h-7 w-auto sm:h-8"
          />
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
            aria-label="Book Consultation"
            className="flex min-h-11 items-center rounded-full bg-champagne-gradient-deep px-5 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-brand-white transition-opacity hover:opacity-90 md:px-6 md:text-xs"
          >
            {/* Full label once there is room for it. */}
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Book Consultation</span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
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
                className="block py-4 text-sm uppercase tracking-[0.15em] text-brand-gray-light hover:text-brand-champagne-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* No booking link here: the CTA is now always visible in the bar,
              so repeating it inside the panel is redundant. */}
          <li className="pt-2 pb-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block py-4 text-sm uppercase tracking-[0.15em] text-brand-gray-light hover:text-brand-champagne-light"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
