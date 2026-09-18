import { brandIcon } from "@/lib/brandIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iPhone and iPad home-screen icon. iOS applies its own rounded mask. */
export default function AppleIcon() {
  return brandIcon({ size: 180, radius: 0, inset: 0.18 });
}
