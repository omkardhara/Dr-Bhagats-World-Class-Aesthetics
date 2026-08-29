/**
 * Embedded Sanity Studio, served from /studio.
 * All Studio routes are handled by this catch-all segment.
 * The Studio itself is a client component so the `sanity` package is never
 * pulled into the React Server Component graph.
 */
import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
