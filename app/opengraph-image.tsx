import { ImageResponse } from "next/og";

import { BRAND } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = BRAND.name;

/**
 * Share card. Without one, links pasted into WhatsApp - the dominant sharing
 * surface for this clinic's audience - render as a bare URL.
 *
 * Drawn rather than photographed so it stays correct while the photography is
 * still stock: brand ground, champagne rule, wordmark, locations.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C7B8AA",
          }}
        >
          Mumbai &amp; Navi Mumbai
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.08,
              color: "#F2E7DA",
              letterSpacing: -1,
              maxWidth: 900,
            }}
          >
            {BRAND.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#9F9A96",
              maxWidth: 760,
            }}
          >
            Medical aesthetics, dermatology and laser treatment.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 6,
            width: "100%",
            background:
              "linear-gradient(90deg, #7F6753 0%, #A08E7C 50%, #C7B8AA 100%)",
          }}
        />
      </div>
    ),
    size
  );
}
