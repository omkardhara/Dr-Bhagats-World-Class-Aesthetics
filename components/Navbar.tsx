"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PRIMARY_NAV } from "@/lib/navigation";
import { BRAND, LOCATIONS } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Transparent over the hero, solid once the page moves. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** While the menu is open: Escape closes it, and the page behind stays still. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        scrolled || open ? "bg-brand-black" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-10 xl:h-[4.5rem]">
        <Link
          href="/"
          onClick={close}
          aria-label={`${BRAND.name}, home`}
          className="-ml-2 flex min-h-11 shrink-0 items-center px-2"
        >
          <Image
            src="/brand/logo-horizontal-light.svg"
            alt=""
            width={204}
            height={57}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-3">
          {/* The one persistent call to action, and the most prominent control in the header. */}
          <Link
            href="/book"
            onClick={close}
            aria-label="Book a Consultation"
            className="flex min-h-12 items-center rounded-full bg-champagne-gradient-deep px-6 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-brand-white ring-1 ring-brand-champagne-light/30 transition-opacity hover:opacity-90 sm:px-8"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a Consultation</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span
              className={`block h-px w-6 bg-brand-white transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-brand-white transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Nine destinations read in full only on their own row, so wide screens get a second line. */}
      <nav aria-label="Primary" className="hidden border-t border-brand-white/10 xl:block">
        <ul className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-10">
          {PRIMARY_NAV.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center whitespace-nowrap text-[0.65rem] uppercase tracking-[0.16em] transition-colors hover:text-brand-champagne-light ${
                    active ? "text-brand-champagne-light" : "text-brand-gray-light"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-brand-black xl:hidden"
      >
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-between gap-16 px-6 pb-12 pt-6 lg:px-10">
          <nav aria-label="Menu">
            <ul>
              {PRIMARY_NAV.map((link) => (
                <li key={link.href} className="border-b border-brand-gray-muted/20">
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className="block py-4 text-2xl font-normal tracking-[0.01em] text-brand-cream transition-colors hover:text-brand-champagne-light sm:text-3xl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {LOCATIONS.map((location) => (
              <address key={location.id} className="not-italic">
                <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                  {location.name}
                </p>
                <p className="mt-3 text-[0.8rem] leading-[1.7] text-brand-gray-muted">
                  {location.streetAddress}, {location.locality} {location.postalCode}
                </p>
              </address>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
