import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";

import SanityPicture from "@/components/SanityPicture";
import type { SanityImage } from "@/sanity/lib/image";

type PortableTextProps = ComponentProps<typeof PortableText>;

/*
 * Types are derived from PortableText itself: next-sanity does not re-export
 * the component and block types, and depending on a transitive package for
 * them would break silently on its next upgrade.
 */
const components: PortableTextProps["components"] = {
  block: {
    normal: ({ children }) => (
      <p className="mt-8 text-[1.1rem] leading-[1.9] text-brand-gray-text first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-16 text-2xl font-normal tracking-[0.01em] text-brand-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-12 text-xl font-normal tracking-[0.01em] text-brand-black">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-10 border-l border-brand-champagne-dark pl-6 text-[1.2rem] leading-[1.8] text-brand-black">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={(value as { href?: string } | undefined)?.href}
        className="text-brand-champagne-dark underline decoration-brand-champagne-light underline-offset-4 hover:text-brand-black"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-14">
        <SanityPicture
          image={value as SanityImage}
          ratio="16/9"
          sizes="(min-width: 1024px) 768px, 100vw"
        />
      </figure>
    ),
  },
};

export default function PortableTextBody({ value }: { value: PortableTextProps["value"] }) {
  return <PortableText value={value} components={components} />;
}
