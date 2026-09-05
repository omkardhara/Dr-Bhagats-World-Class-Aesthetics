import { ImageResponse } from "next/og";

import { BRAND } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared share-card renderer.
 *
 * Kept in one place so every card stays visually identical while only the
 * eyebrow and title change: a concern shared into WhatsApp should look like
 * the same practice as a device page, not like a different site.
 */
export function ogCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
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
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 34 ? 64 : 82,
              lineHeight: 1.08,
              color: "#F2E7DA",
              letterSpacing: -1,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 26,
                fontSize: 26,
                color: "#9F9A96",
                maxWidth: 780,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 20, letterSpacing: 4, color: "#9F9A96", textTransform: "uppercase" }}>
            {BRAND.shortName}
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
    OG_SIZE
  );
}
