import Image from "next/image";

import type { StockImage } from "@/lib/stockImages";

/**
 * A wide image band.
 *
 * `sanity` takes priority when set, so the moment real photography is uploaded
 * to the Studio it replaces the stock placeholder with no code change.
 */
export default function EditorialImage({
  fallback,
  sanity,
  priority = false,
  className = "",
  fullBleed = false,
  ratio = "16/9",
}: {
  fallback: StockImage;
  sanity?: { url: string; alt?: string } | null;
  priority?: boolean;
  className?: string;
  /** Break out of the container and run edge to edge, as the peers do. */
  fullBleed?: boolean;
  ratio?: "16/9" | "21/9" | "4/3";
}) {
  const src = sanity?.url ?? fallback.src;
  const alt = sanity?.alt ?? fallback.alt;
  const isPlaceholder = !sanity;

  const aspect =
    ratio === "21/9"
      ? "aspect-[21/9]"
      : ratio === "4/3"
        ? "aspect-[4/3]"
        : "aspect-[16/9]";

  return (
    <figure
      className={`${
        fullBleed ? "relative left-1/2 w-screen -translate-x-1/2" : ""
      } ${className}`}
    >
      <div className={`relative ${aspect} w-full overflow-hidden bg-brand-gray-dark`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 1280px, 100vw"
          priority={priority}
          className="object-cover"
        />
      </div>
      {isPlaceholder ? (
        // Visible while stock stands in, so nobody mistakes it for the clinic's
        // own photography. Remove with the stock images.
        <figcaption
          className={`mt-4 text-[0.6rem] uppercase tracking-widest text-brand-gray-text ${
            fullBleed ? "mx-auto w-full max-w-7xl px-6 lg:px-10" : ""
          }`}
        >
          Stock image — awaiting clinic photography
        </figcaption>
      ) : null}
    </figure>
  );
}
