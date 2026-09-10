# Dr Bhagat's World Class Aesthetics

Marketing site and content studio. Next.js (App Router) + TypeScript + Tailwind, with Sanity as the CMS and an embedded Studio at `/studio`.

**Expertise, Elevated.** The site is organised around the doctors' principle: *the doctor decides, technology supports, the patient receives a personalised plan.* Every page follows the patient journey — concern → assessment → personalised strategy → technology → results — and never leads with a machine. See [`docs/INFORMATION-ARCHITECTURE.md`](docs/INFORMATION-ARCHITECTURE.md) before changing navigation or page order.

What the client still needs to supply or approve is tracked in [`docs/CONTENT-REVIEW.md`](docs/CONTENT-REVIEW.md).

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
| `NEXT_PUBLIC_SITE_URL` | production | Canonical origin, e.g. `https://www.drbhagats.com` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no | Search Console verification token |
| `NEXT_PUBLIC_SANITY_DEV_PROXY_ORIGIN` | no | See [Studio stuck on "Trying to connect"](#studio-stuck-on-trying-to-connect) |

The read token must be Viewer-scoped. The site reads Sanity from server components, so the token never reaches the browser — but a write-capable token in a read path is an unnecessary risk.

**Do not set `SANITY_API_WRITE_TOKEN` in the deployment.** It is only needed to run the seed script locally.

### Why a read token at all

Sanity treats any document whose id contains a dot (for example `concern.acne`) as private: anonymous queries never return it, whatever the dataset's visibility. The seed uses dotted ids for readability, so a Viewer token is required for the site to render content. Using a token bypasses Sanity's CDN; `revalidate` on each page still caches the rendered result.

## Content model

Document types are in `sanity/schemaTypes/`; the Studio sidebar is arranged in `sanity/structure.ts` in the same order as the patient journey.

| Type | Studio title | Public page |
| --- | --- | --- |
| `concern` | Your Concerns | `/concerns/[slug]` — understanding, assessment, approach, then technology last |
| `treatmentApproach` | Treatment Approaches | `/treatment-approaches/[slug]` |
| `signatureProgramme` | Signature Programmes | `/signature-programmes/[slug]` |
| `treatment` | Modality | None. Listed within approaches |
| `machine` | Technology | `/technology/[slug]`, framed by the concerns it supports |
| `result` | Results | `/results`. Only rendered when `consentConfirmed` is true |
| `testimonial` | Testimonials | `/results` and the homepage. Quotes are verbatim |
| `doctor` | Doctors | `/about` and the homepage |
| `clinicSpace` | The Clinic | `/the-clinic`. A space only appears once it has an image |
| `teamMember` | Team | `/the-clinic` |
| `journalArticle` | Journal | `/journal/[slug]` |
| `siteSettings` | Site Settings (singleton) | Hero, philosophy and clinic imagery |

Category lists shared by schemas and pages (result categories, technology groupings) are in `sanity/lib/categories.ts`.

### Imagery

There is no stock photography and no fallback. `components/SanityPicture.tsx` renders nothing when an image is not set, and every layout is designed to read as complete without one. Upload the clinic's own photography in the Studio.

## Seeding

`seedSanity.ts` creates the full taxonomy from `sanity/seed/content.ts` in a single transaction.

```bash
npm run seed
```

- Documents use deterministic ids and are **upserted**: text fields are overwritten, but images uploaded in the Studio are never touched.
- Re-running overwrites text edits made in the Studio. Once the client starts editing copy, treat the Studio as the source of truth and stop running the seed.
- Documents from the retired model (`technologyPillar`, `coreService`, the old granular concerns and modalities) are deleted explicitly.

Requires `SANITY_API_WRITE_TOKEN`.

> **The seeded clinical copy has not been reviewed by a clinician.** See `docs/CONTENT-REVIEW.md`.

## Redirects

`lib/redirects.ts` maps every URL from the retired Finesse site and from earlier versions of this site (`/services`, `/testimonials`, the old granular concern slugs) onto the new structure. Specific redirects are applied first, then catch-alls. `finesseclinic.com` must stay registered and pointed here for these to preserve search traffic.

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
components/ui.tsx    Shared editorial blocks: Section, Rail, Rows, PageHero, BeginConsultation
lib/navigation.ts    Primary and footer navigation, in the doctors' order
lib/site.ts          Brand, tagline, locations. Unconfirmed details are null and not rendered
sanity/              Client, queries, types, schema definitions, seed content
docs/                Information architecture and content review
```

`app/studio/[[...tool]]/Studio.tsx` is a client component on purpose: importing `sanity` into the RSC graph pulls in `swr`'s react-server build and fails the build.

`package.json` pins a single `@sanity/client` via `overrides` — `next-sanity`'s peer range is behind `sanity`'s, so npm otherwise installs a second copy.

## Known gaps

- `/book` does not submit. The destination and privacy notice are a client decision.
- Doctor portraits, clinic photography, CVs, contact details and clinical copy approval are outstanding — see `docs/CONTENT-REVIEW.md`.
