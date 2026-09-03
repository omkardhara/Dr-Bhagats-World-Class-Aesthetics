import type { NextConfig } from "next";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * Opt-in loopback proxy for the Sanity API. Disabled unless
 * NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN is set, and never active in production.
 *
 * Only needed on machines where endpoint-security software inspects browser
 * traffic and buffers `text/event-stream` responses. Ordinary requests still
 * succeed there, so the Studio loads and authenticates but its real-time
 * listener hangs, leaving the UI stuck on "Trying to connect...".
 *
 * Loopback traffic is not inspected, so with this enabled the browser talks
 * only to the dev server and Node makes the external call. The origin is
 * configurable because it must match the port the dev server is actually on.
 *
 * Requests go to a route handler rather than straight to api.sanity.io: the
 * upstream response must be uncompressed, since gzipping a stream buffers it.
 * See app/api/sanity/[...path]/route.ts.
 */
const devProxyOrigin = process.env.NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN;

const nextConfig: NextConfig = {
  async redirects() {
    // The .vercel.app domain stays publicly reachable after a custom domain is
    // attached, so it competes with the canonical host in the index. Send it
    // (and any other non-canonical host) to the real domain.
    const canonical = process.env.NEXT_PUBLIC_SITE_URL;
    if (!canonical) return [];

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<vercelHost>.*\.vercel\.app)" }],
        destination: `${canonical}/:path*`,
        permanent: true,
      },
    ];
  },

  async rewrites() {
    if (!projectId || !devProxyOrigin) return [];

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
