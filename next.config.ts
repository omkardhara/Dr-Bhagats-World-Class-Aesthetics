import type { NextConfig } from "next";

import { ALL_REDIRECTS, CATCH_ALL_REDIRECTS } from "./lib/redirects";

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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },

  async redirects() {
    // The .vercel.app domain stays publicly reachable after a custom domain is
    // attached, so it competes with the canonical host in the index. Send it
    // to the real domain - but only when the canonical origin is configured.
    //
    // Only this host redirect depends on NEXT_PUBLIC_SITE_URL. The path
    // redirects below must never be gated on it: when they were, a deployment
    // without the variable silently dropped every retired URL to a 404.
    const canonical = process.env.NEXT_PUBLIC_SITE_URL;
    const hostRedirect = canonical
      ? [
          {
            source: "/:path*",
            has: [{ type: "host" as const, value: "(?<vercelHost>.*\.vercel\.app)" }],
            destination: `${canonical}/:path*`,
            permanent: true,
          },
        ]
      : [];

    return [
      ...hostRedirect,
      // Retired finesseclinic.com structure. Matched on path, so these also
      // catch stale inbound links; they carry the old site's search equity
      // once that domain points here. Both slash forms are covered.
      ...ALL_REDIRECTS.flatMap(({ from, to }) => [
        { source: from, destination: to, permanent: true },
        { source: `${from}/`, destination: to, permanent: true },
      ]),
      // Anything else under a retired tree, rather than a 404.
      ...CATCH_ALL_REDIRECTS.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: true,
      })),
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
