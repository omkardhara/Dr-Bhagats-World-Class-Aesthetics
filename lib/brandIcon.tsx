import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * The browser-tab and home-screen icon: the monogram on a solid black tile.
 *
 * The transparent champagne mark it replaces read as near-white on Chrome's
 * light tab strip. A black tile carries the light monogram clearly on light
 * and dark tab strips alike, and as a PNG it also works on iPhones, which
 * ignore SVG home-screen icons.
 */
export async function brandIcon({
  size,
  radius,
  inset,
}: {
  /** Square edge, in pixels. */
  size: number;
  /** Corner radius. iOS rounds its own home-screen icons, so pass 0 there. */
  radius: number;
  /** Padding around the mark, as a fraction of the edge. */
  inset: number;
}) {
  const svg = await readFile(join(process.cwd(), "public/brand/monogram-light.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  const mark = Math.round(size * (1 - inset * 2));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: radius,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by ImageResponse */}
        <img src={src} width={mark} height={mark} alt="" />
      </div>
    ),
    { width: size, height: size }
  );
}
