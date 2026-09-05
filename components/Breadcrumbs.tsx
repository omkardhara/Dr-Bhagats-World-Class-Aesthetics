import Link from "next/link";

import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href: string };

/**
 * Visible trail plus BreadcrumbList structured data.
 *
 * Deep pages previously offered no way up except the browser back button, and
 * Google had nothing to render as a breadcrumb in results - it falls back to
 * showing the raw URL path instead.
 *
 * The trailing crumb is the current page: it is included in the schema (Google
 * expects the full trail) but rendered as plain text, since linking a page to
 * itself is noise for screen reader users.
 */
export default function Breadcrumbs({
  crumbs,
  tone = "light",
}: {
  crumbs: Crumb[];
  /** "light" sits on the dark hero, "dark" on the bone ground. */
  tone?: "light" | "dark";
}) {
  if (crumbs.length === 0) return null;

  const linkColor =
    tone === "light"
      ? "text-brand-champagne-light hover:text-brand-cream"
      : "text-brand-champagne-dark hover:text-brand-black";
  const currentColor =
    tone === "light" ? "text-brand-gray-muted" : "text-brand-gray-text";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.label,
              item: `${SITE_URL}${crumb.href}`,
            })),
          }),
        }}
      />

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.65rem] uppercase tracking-widest">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-x-3">
                {index > 0 ? (
                  <span aria-hidden className="h-3 w-px bg-brand-gray-muted/40" />
                ) : null}
                {isLast ? (
                  <span aria-current="page" className={currentColor}>
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={`transition-colors ${linkColor}`}
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
