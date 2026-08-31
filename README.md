# Dr Bhagat's World Class Aesthetics

Marketing site and content studio. Next.js (App Router) + TypeScript + Tailwind, with Sanity as the CMS and an embedded Studio at `/studio`.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev
```

- Site — http://localhost:3000
- Studio — http://localhost:3000/studio

## Environment variables

Copy `.env.local.example` to `.env.local`. `.env.local` is gitignored; never commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project id |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | yes | API date, e.g. `2024-10-01` |
| `SANITY_API_READ_TOKEN` | yes | **Viewer**-scoped. Server-side reads only |
| `SANITY_API_WRITE_TOKEN` | local only | **Editor**-scoped. Used solely by `seedSanity.ts` |
| `NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN` | no | See [Studio stuck on "Trying to connect"](#studio-stuck-on-trying-to-connect) |

The read token must be Viewer-scoped. The site reads Sanity from server components, so the token never reaches the browser — but a write-capable token in a read path is an unnecessary risk.

**Do not set `SANITY_API_WRITE_TOKEN` in the deployment.** It is only needed to run the seed script locally.

### Why a read token at all

This dataset returns zero documents to unauthenticated reads even though its ACL reports `public`. Until that is resolved with Sanity, a Viewer token is required for the site to render content. Note that using a token bypasses Sanity's CDN; `revalidate` on each page still caches the rendered result.

## Content model

Four document types, in `sanity/schemaTypes/`:

- `machine` — an individual device (name, description)
- `technologyPillar` — a clinical grouping, referencing machines
- `treatment` — a treatment, referencing the machines that deliver it
- `coreService` — a service area, referencing treatments

Rendered by `/technology` (pillars) and `/services` (services → treatments → machines).

## Seeding

`seedSanity.ts` populates the dataset with the full taxonomy in a single transaction. Documents use deterministic ids with `createOrReplace`, so it is safe to re-run — it will overwrite edits made in the Studio.

```bash
npm run seed
```

Requires `SANITY_API_WRITE_TOKEN`.

> **The seeded copy is placeholder.** Machine descriptions, pillar names, treatment groupings and page copy were drafted as scaffolding and have not been reviewed by a clinician. Review before publishing.

## Deployment

Set every required variable above in the hosting provider (all environments), then deploy. New environment variables do not apply to an existing build — redeploy after adding them.

For the Studio to work on the deployed domain, add that origin under **API → CORS Origins** in [sanity.io/manage](https://sanity.io/manage), with credentials allowed. Anyone who needs Studio access must also be invited as a project member.

## Studio stuck on "Trying to connect"

Some endpoint-security products inspect browser traffic and buffer `text/event-stream` responses. Ordinary requests still succeed, so the Studio loads and authenticates, but its real-time listener never receives data and retries forever.

The tell: the same endpoint streams fine from Node and from an uninspected browser, while the affected browser receives no response headers at all.

Workaround — set the dev server's origin, matching the port actually in use:

```
NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN="http://localhost:3000"
```

The Studio then talks only to localhost and the dev server makes the external call, since loopback traffic is not inspected. It is off by default, development-only, and never active in production.

Implementation is `next.config.ts` (host-based rewrite) plus `app/api/sanity/[...path]/route.ts`. The route handler exists because the upstream response must be requested uncompressed — gzipping a stream buffers it, reproducing the same hang.

If you verify streaming with `curl`, send `Accept-Encoding: gzip`. Without it curl gets an uncompressed response and appears to work while every browser hangs.

## Notable structure

```
app/(site)/          Public pages; the Navbar lives in this group's layout
app/studio/          Embedded Studio, outside (site) so the Navbar is excluded
app/api/sanity/      Opt-in dev proxy (see above)
sanity/              Client, queries, types, schema definitions
```

`app/studio/[[...tool]]/Studio.tsx` is a client component on purpose: importing `sanity` into the RSC graph pulls in `swr`'s react-server build and fails the build.

`package.json` pins a single `@sanity/client` via `overrides` — `next-sanity`'s peer range is behind `sanity`'s, so npm otherwise installs a second copy.

## Known gaps

- `/book` renders a form that does not submit. Wire it to a booking system or form service.
- `/about` contains placeholder positioning copy.
- All medical copy needs clinical review.
