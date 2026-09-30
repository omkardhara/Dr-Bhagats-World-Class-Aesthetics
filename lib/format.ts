/**
 * The Journal is written by the doctors, not published by the clinic, so each
 * piece is attributed to a desk: "Dr Priyam Bhagat" becomes "From Dr Priyam's desk".
 */
export function desk(name: string | null | undefined): string {
  if (!name) return "";
  const [title, first] = name.split(" ");
  return first ? `From ${title} ${first}’s desk` : `From ${title}’s desk`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/** Splits CMS text into paragraphs on blank lines. */
export function paragraphs(text?: string | null): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function pad(index: number): string {
  return String(index).padStart(2, "0");
}
