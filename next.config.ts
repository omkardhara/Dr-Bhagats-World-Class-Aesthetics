import type { NextConfig } from "next";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * Loopback proxy for the Sanity API.
 *
 * Some endpoint-security products (Sophos Network Threat Protection here)
 * transparently inspect browser traffic and buffer `text/event-stream`
 * responses, waiting for a body that never ends. Ordinary requests succeed;
 * the Studio's real-time listener hangs at readyState 0 until it times out
 * with "No activity within 45000 milliseconds", leaving the Studio stuck on
 * "Trying to connect...".
 *
 * Loopback traffic is not inspected, and Node reaches Sanity fine. So the
 * browser talks only to localhost and the dev server makes the external call.
 * `apiHost` in sanity.config.ts prepends the project id as a subdomain, which
 * is why this matches on `<projectId>.localhost` rather than a path prefix.
 *
 * This forwards to a route handler rather than straight to api.sanity.io: the
 * upstream response must be uncompressed, because gzipping a stream buffers
 * it. See app/api/sanity/[...path]/route.ts.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    if (!projectId) return [];

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `${projectId}.localhost` }],
        destination: "/api/sanity/:path*",
      },
    ];
  },
};

export default nextConfig;
