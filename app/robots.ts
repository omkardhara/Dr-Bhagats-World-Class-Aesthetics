import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The assistants that read the web on a patient's behalf, named explicitly.
 *
 * A wildcard Allow already permits them, but several of these crawlers look for
 * their own user-agent first and some publishers block them by default. Naming
 * each one states the practice's position plainly: this content may be read,
 * quoted and cited. Anything genuinely private is excluded below for everyone.
 */
const ASSISTANTS = [
  // OpenAI: training, live browsing, and the ChatGPT search index.
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic.
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity.
  "PerplexityBot",
  "Perplexity-User",
  // Google's Gemini and Vertex grounding (AI Overviews uses Googlebot).
  "Google-Extended",
  // Apple Intelligence and Siri.
  "Applebot",
  "Applebot-Extended",
  // Microsoft Copilot rides on the Bing index.
  "bingbot",
  // Others that surface answers with citations.
  "Amazonbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
];

/** Not for anyone: the Studio, the API, and the private photography brief. */
const PRIVATE = ["/studio", "/api/", "/shot-list"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      ...ASSISTANTS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
