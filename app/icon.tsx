import { brandIcon } from "@/lib/brandIcon";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser tab icon. Rendered at 64px so it stays crisp on high-density screens. */
export default function Icon() {
  // Minimal padding: the tab shows this at 16px, where every pixel of mark counts.
  return brandIcon({ size: 64, radius: 14, inset: 0.04 });
}
