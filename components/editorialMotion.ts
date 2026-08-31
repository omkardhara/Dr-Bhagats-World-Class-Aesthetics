"use client";

import { useReducedMotion, type Variants } from "framer-motion";

/** Slow, weighted easing - avoids the springy feel of the default curve. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared fade-up variants for the editorial pages.
 *
 * `useReducedMotion` drops both the translation and the duration rather than
 * disabling the animation, so content still resolves to visible for anyone
 * who has asked for less motion - a fade-up that never runs would hide it.
 */
export function useEditorialMotion(): { block: Variants; item: Variants } {
  const reduced = useReducedMotion();
  const rise = reduced ? 0 : 28;

  return {
    block: {
      hidden: { opacity: 0, y: rise },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduced ? 0 : 1.1, ease: EASE },
      },
    },
    item: {
      hidden: { opacity: 0, y: rise },
      show: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0 : 0.9,
          ease: EASE,
          delay: reduced ? 0 : index * 0.09,
        },
      }),
    },
  };
}

/** Viewport config used across the editorial pages. */
export const VIEWPORT_BLOCK = { once: true, margin: "-96px" } as const;
export const VIEWPORT_ITEM = { once: true, margin: "-64px" } as const;
