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
}: {
  fallback: StockImage;
  sanity?: { url: string; alt?: string } | null;
  priority?: boolean;
  className?: string;
}) {
  const src = sanity?.url ?? fallback.src;
  const alt = sanity?.alt ?? fallback.alt;
  const isPlaceholder = !sanity;

  return (
    <figure className={className}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-gray-dark">
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
        <figcaption className="mt-4 text-[0.6rem] uppercase tracking-widest text-brand-gray-muted">
          Stock image — awaiting clinic photography
        </figcaption>
      ) : null}
    </figure>
  );
}
