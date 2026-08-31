/**
 * Development-only loopback proxy for the Sanity API.
 *
 * Why this exists: endpoint-security software that inspects browser traffic
 * buffers `text/event-stream` responses, hanging the Studio's real-time
 * listener. Loopback traffic is not inspected, so the browser talks to the
 * dev server and Node makes the external call.
 *
 * Why a route handler rather than a plain rewrite: the response must not be
 * compressed. Browsers send `Accept-Encoding: gzip`, and gzipping a stream
 * buffers it - the client receives the gzip header and then nothing, which
 * looks exactly like the problem this proxy is meant to solve. We request
 * `identity` upstream and stream the bytes straight through.
 */
import { type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/** Hop-by-hop and encoding headers that must not be forwarded verbatim. */
const STRIP_REQUEST = new Set([
  "host",
  "connection",
  "accept-encoding",
  "content-length",
]);

const STRIP_RESPONSE = new Set([
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "connection",
]);

async function proxy(request: NextRequest, path: string[]) {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }
  if (!projectId) {
    return new Response("NEXT_PUBLIC_SANITY_PROJECT_ID is not set", {
      status: 500,
    });
  }

  const search = request.nextUrl.search;
  const target = `https://${projectId}.api.sanity.io/${path.join("/")}${search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!STRIP_REQUEST.has(key.toLowerCase())) headers.set(key, value);
  });
  // Force an uncompressed upstream response so the stream is not buffered.
  headers.set("accept-encoding", "identity");

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : request.body,
    // Required by undici when streaming a request body.
    ...(request.method === "GET" || request.method === "HEAD"
      ? {}
      : { duplex: "half" }),
    redirect: "manual",
    cache: "no-store",
  } as RequestInit);

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!STRIP_RESPONSE.has(key.toLowerCase())) responseHeaders.set(key, value);
  });
  // Keep intermediaries from buffering the event stream.
  responseHeaders.set("cache-control", "no-cache, no-transform");
  responseHeaders.set("x-accel-buffering", "no");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  return proxy(request, (await ctx.params).path);
}
export async function POST(request: NextRequest, ctx: Ctx) {
  return proxy(request, (await ctx.params).path);
}
export async function PUT(request: NextRequest, ctx: Ctx) {
  return proxy(request, (await ctx.params).path);
}
export async function PATCH(request: NextRequest, ctx: Ctx) {
  return proxy(request, (await ctx.params).path);
}
export async function DELETE(request: NextRequest, ctx: Ctx) {
  return proxy(request, (await ctx.params).path);
}
export async function OPTIONS(request: NextRequest, ctx: Ctx) {
  return proxy(request, (await ctx.params).path);
}
