import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

let cached: SanityClient | undefined;

/**
 * Created on first use rather than at module load, so importing this file in a
 * route does not crash the build before the project credentials are filled in.
 *
 * SANITY_API_READ_TOKEN is only needed while the dataset is private. A private
 * dataset returns an EMPTY result set to unauthenticated reads rather than a
 * 403, so a missing token looks exactly like "no content published yet".
 * Note the CDN is bypassed when a token is used, since responses are per-token.
 */
export function getClient(): SanityClient {
  if (!cached) {
    const token = process.env.SANITY_API_READ_TOKEN;
    cached = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: !token,
    });
  }
  return cached;
}
