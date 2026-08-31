/**
 * Sanity Studio config - mounted at `/studio` by app/studio/[[...tool]]/page.tsx
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

/**
 * Opt-in loopback proxy (development only).
 *
 * Set NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN to your dev server's origin (for
 * example "http://localhost:3000") only if the Studio hangs on "Trying to
 * connect...". That happens when endpoint-security software inspects browser
 * traffic and buffers `text/event-stream` responses, stalling the real-time
 * listener while ordinary requests still succeed. See next.config.ts.
 *
 * Leave it unset otherwise - the Studio then talks to Sanity directly, which
 * is faster (HTTP/2) and needs no local rewrite. It must match the port the
 * dev server is actually running on.
 *
 * `apiHost` prepends the project id, so the origin above resolves to
 * `http://<projectId>.localhost:3000`. Cookies are scoped to sanity.io and
 * cannot reach that origin, so token auth is required alongside it.
 */
const devProxyOrigin = process.env.NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN;
const useDevProxy =
  process.env.NODE_ENV === "development" && Boolean(devProxyOrigin);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  ...(useDevProxy
    ? { apiHost: devProxyOrigin, auth: { loginMethod: "token" as const } }
    : {}),
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
