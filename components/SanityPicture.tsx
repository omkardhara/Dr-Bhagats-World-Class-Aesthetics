import Image from "next/image";

import { imageProps, type SanityImage } from "@/sanity/lib/image";

const ASPECT = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
} as const;

/**
 * A Sanity image, or nothing at all.
 *
 * There is no fallback on purpose. Stock photography has been removed from
 * the site, and every layout is designed to read as complete without imagery,
 * so an unset image leaves no frame, placeholder or apologetic caption behind.
 */
export default function SanityPicture({
  image,
  ratio = "16/9",
  sizes = "100vw",
  width = 1800,
  priority = false,
  alt,
  className = "",
}: {
  image: SanityImage | null | undefined;
  ratio?: keyof typeof ASPECT;
  sizes?: string;
  width?: number;
  priority?: boolean;
  alt?: string;
  className?: string;
}) {
  const props = imageProps(image, width);
  if (!props) return null;

  return (
    <div className={`relative ${ASPECT[ratio]} w-full overflow-hidden bg-brand-gray-dark ${className}`}>
      <Image
        src={props.url}
        alt={props.alt ?? alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
