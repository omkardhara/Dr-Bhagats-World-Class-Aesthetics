# Dr Bhagat's World Class Aesthetics

Marketing site and content studio. Next.js (App Router) + TypeScript + Tailwind, with Sanity as the CMS and an embedded Studio at `/studio`.

**Expertise, Elevated.** The site is organised around the doctors' principle: *the doctor decides, technology supports, the patient receives a personalised plan.* Every page follows the patient journey — concern → assessment → personalised strategy → technology → results — and never leads with a machine. The recurring guiding principle is **Considered care. Never a menu.** See [`docs/INFORMATION-ARCHITECTURE.md`](docs/INFORMATION-ARCHITECTURE.md) before changing navigation or page order.

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
| `NEXT_PUBLIC_SITE_URL` | production | Canonical origin, e.g. `https://www.drbhagats.com`. Enables the vercel.app → canonical redirect |
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
| `signatureProgramme` | Signature Programmes | Sections of `/signature`, linked as `/signature#slug`. No technology field, by design |
| `treatmentApproach` | Treatment Approaches | `/treatment-approaches/[slug]` |
| `treatment` | Modality | None. Listed within approaches |
| `machine` | Technology | A card on `/technology` in each of its `categories`. Only `dedicatedPage` technologies get `/technology/[slug]`; any other slug redirects to its card |
| `result` | Results | `/results`. Only rendered when `consentConfirmed` is true |
| `testimonial` | Testimonials | `/results` and the homepage. Quotes are verbatim |
| `doctor` | Doctors | `/about` and the homepage. Empty credential sections are hidden |
| `clinicSpace` | The Clinic | `/about#the-clinic`. A space only appears once it has an image |
| `teamMember` | Team | `/about#the-clinic` |
| `journalArticle` | Journal | `/journal/[slug]` |
| `siteSettings` | Site Settings (singleton) | Hero, philosophy and clinic imagery |

Category lists shared by schemas and pages are in `sanity/lib/categories.ts`. Where a technology or programme links to is decided in one place, `lib/links.ts`.

The navigation is deliberately short: About · Concerns · Treatments · Technology · Journal · Contact, plus the Consult button ("Book a Consultation" where it fits). The Clinic is part of `/about` (`/the-clinic` redirects to `/about#the-clinic`), and the Signature programmes are introduced from Treatments. `/contact` and `/book` share `components/ClinicDetails.tsx`. Contact details live in `lib/site.ts`; any value left `null` is not rendered anywhere.

### Imagery

There is no stock photography and no fallback. `components/SanityPicture.tsx` renders nothing when an image is not set, and every layout is designed to read as complete without one. Upload the clinic's own photography in the Studio.

## Seeding

`seedSanity.ts` creates the full taxonomy from `sanity/seed/content.ts` in a single transaction.

```bash
npm run seed                       # full: write content, then remove retired fields and documents
npx tsx seedSanity.ts --additive   # write content only; nothing is unset or deleted
```

- Documents use deterministic ids and are **upserted**: text fields are overwritten, but images uploaded in the Studio are never touched.
- Re-running overwrites text edits made in the Studio. Once the client starts editing copy, treat the Studio as the source of truth and stop running the seed.
- When a content-model change ships, run `--additive` first, so the site still live on the previous code keeps the fields it reads. Deploy, then run the full seed to clean up.

Requires `SANITY_API_WRITE_TOKEN`.

> **Parts of the seeded copy have not been reviewed by a clinician.** See `docs/CONTENT-REVIEW.md`.

## Redirects

`lib/redirects.ts` maps every URL from the retired Finesse site and from earlier versions of this site (`/services`, `/testimonials`, `/contact`, `/signature-programmes`, the old granular concern slugs, renamed technologies) onto the current structure. Specific redirects are applied first, then catch-alls. They never depend on environment variables. `finesseclinic.com` must stay registered and pointed here for these to preserve search traffic.

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
components/ui.tsx    Shared editorial blocks: Section, Rail, Rows, Statement, PageHero, BeginConsultation
lib/navigation.ts    Primary and footer navigation, in the doctors' order
lib/site.ts          Brand lines, locations and contact details. Unconfirmed details are null and not rendered
lib/links.ts         Where technologies and programmes link to
sanity/              Client, queries, types, schema definitions, seed content
docs/                Information architecture and content review
```

`app/studio/[[...tool]]/Studio.tsx` is a client component on purpose: importing `sanity` into the RSC graph pulls in `swr`'s react-server build and fails the build.

`package.json` pins a single `@sanity/client` via `overrides` — `next-sanity`'s peer range is behind `sanity`'s, so npm otherwise installs a second copy.

## Known gaps

- `/book` does not submit. The destination and privacy notice are a client decision.
- Doctor portraits and credentials, clinic photography, contact details and approval of drafted copy are outstanding — see `docs/CONTENT-REVIEW.md`.
