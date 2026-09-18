import { FORMAT, type Brief } from "@/lib/shotList";

const ASPECT = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
} as const;

/**
 * A photograph still to be taken, shown only in the shot-list preview. It sits
 * exactly where the photograph will, at its ratio, with the brief inside.
 * `fill` covers a positioned parent instead - the home page hero.
 */
export default function ShotBrief({
  brief,
  ratio = "16/9",
  fill = false,
  className = "",
}: {
  brief: Brief;
  ratio?: keyof typeof ASPECT | "hero";
  fill?: boolean;
  className?: string;
}) {
  const format = FORMAT[fill ? "hero" : ratio];
  const frame = fill ? "absolute inset-0" : `relative w-full ${ASPECT[ratio as keyof typeof ASPECT]}`;

  return (
    <div
      role="img"
      aria-label={`Photograph to be taken: ${brief.title}`}
      className={`@container overflow-hidden bg-[#232120] ${frame} ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(212,190,150,0.05) 0 1px, transparent 1px 22px)",
      }}
    >
      <span aria-hidden className="absolute inset-2 border border-brand-champagne-light/30 @sm:inset-3" />
      <div
        aria-hidden
        className={`absolute flex flex-col gap-3 p-4 @sm:p-6 @md:p-8 ${
          fill ? "right-0 top-28 max-w-md lg:top-32" : "inset-0 justify-between"
        }`}
      >
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          Photograph to be taken · {format}
        </p>
        <div>
          <p className="text-[0.95rem] leading-snug text-brand-cream @md:text-lg @xl:text-xl">{brief.title}</p>
          <p className="mt-2 hidden text-[0.75rem] leading-[1.6] text-brand-gray-muted @sm:line-clamp-4 @md:text-[0.85rem]">
            {brief.direction}
          </p>
        </div>
      </div>
    </div>
  );
}
