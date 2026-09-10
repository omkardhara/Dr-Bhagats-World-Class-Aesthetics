"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useEditorialMotion, VIEWPORT_ITEM } from "@/components/editorialMotion";

/**
 * Slow fade-up as an element enters the viewport.
 *
 * Lets server components use the editorial motion without becoming client
 * components themselves, which would pull their Sanity data into the bundle.
 */
export default function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  /** Staggers siblings: pass each item's position in its list. */
  index?: number;
  className?: string;
}) {
  const { item } = useEditorialMotion();

  return (
    <motion.div
      custom={index}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ITEM}
      className={className}
    >
      {children}
    </motion.div>
  );
}
