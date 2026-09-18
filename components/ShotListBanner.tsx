import { shotListEnabled } from "@/lib/shotList";

/** A quiet bar that keeps the shot-list preview from being mistaken for the live site. */
export default async function ShotListBanner() {
  if (!(await shotListEnabled())) return null;

  return (
    <div
      role="region"
      aria-label="Shot-list preview"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-champagne-light/40 bg-brand-black/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-1 px-6 py-2 lg:px-10">
        <p className="text-[0.75rem] leading-[1.5] text-brand-cream">
          <span className="uppercase tracking-widest text-brand-champagne-light">Shot-list preview</span>
          <span className="text-brand-gray-muted">
            {" "}
            · Framed boxes mark photographs still to be taken. Only you can see them.
          </span>
        </p>
        <p className="flex gap-6">
          <a
            href="/shot-list"
            className="inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest text-brand-cream hover:text-brand-champagne-light"
          >
            Full shot list
          </a>
          <a
            href="/api/shot-list?mode=off"
            className="inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest text-brand-cream hover:text-brand-champagne-light"
          >
            Exit preview
          </a>
        </p>
      </div>
    </div>
  );
}
