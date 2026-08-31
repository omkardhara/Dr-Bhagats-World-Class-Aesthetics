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
 * In development the Studio talks to Sanity through the dev server's loopback
 * proxy (see the rewrite in next.config.ts) instead of calling api.sanity.io
 * from the browser. Endpoint-security software that inspects browser traffic
 * buffers `text/event-stream` responses, which hangs the Studio's real-time
 * listener; loopback traffic is not inspected.
 *
 * `apiHost` prepends the project id, so this resolves to
 * `http://<projectId>.localhost:3000`, which the rewrite forwards upstream.
 *
 * Cookies are scoped to sanity.io and will not reach the proxy origin, so
 * token auth (stored in localStorage) is required when the proxy is active.
 */
const useLoopbackProxy = process.env.NODE_ENV === "development";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  ...(useLoopbackProxy
    ? { apiHost: "http://localhost:3000", auth: { loginMethod: "token" as const } }
    : {}),
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
