/**
 * Where a technology or programme lives on the site. Kept in one place because
 * both are decided by content, not by the page linking to them.
 */

/**
 * Only a few selected technologies have a page of their own; every other one
 * is a card on /technology. Luxury is selective - twelve machines should never
 * become twelve competing heroes.
 */
export function technologyHref(technology: { slug: string; dedicatedPage?: boolean | null }) {
  return technology.dedicatedPage ? `/technology/${technology.slug}` : `/technology#${technology.slug}`;
}

/** Every signature programme is a section of the one Signature page. */
export function programmeHref(slug: string) {
  return `/signature#${slug}`;
}
