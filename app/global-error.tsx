"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: catches failures in the root layout itself, so it must
 * render its own <html> and cannot rely on the app's styles or fonts.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#F2E7DA",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "36rem" }}>
          <h1 style={{ fontWeight: 400, fontSize: "2rem", lineHeight: 1.2 }}>
            This page could not be loaded.
          </h1>
          <p style={{ color: "#9F9A96", lineHeight: 1.7 }}>
            Please try again. If the problem continues, contact the clinic
            directly.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "1rem 2rem",
              border: 0,
              cursor: "pointer",
              background: "#7F6753",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.7rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
