# Information architecture

Revised in response to the doctors' feedback of September 2026.

## The principle

> The doctor decides. Technology supports. The patient receives a personalised plan.

Machines are tools. Clinical expertise is the product. The Dr Bhagat's
experience is the brand.

The previous structure implied **machine → procedure → booking**. The site is
now organised around the patient's journey:

**Concern → doctor's assessment → personalised strategy → appropriate technology → results**

Every concern page follows that order literally. Technology is always the last
thing a page introduces, never the first.

## Brand language

| Role | Line |
| --- | --- |
| Primary tagline | **Expertise, Elevated.** |
| Supporting | Where dermatological expertise meets the art of aesthetics. |
| Supporting | Every face is different. Every treatment plan should be too. |
| Philosophy (not a tagline) | Considered treatment, not a menu. |

## Navigation

Home · About · Your Concerns · Treatment Approaches · Technology · Results ·
The Clinic · Journal · Contact — with a persistent **Book a Consultation**.

Inline from 1280px; a full-screen menu below that.

## Sitemap

```
/                                   Home
/about                              The doctors and the clinical philosophy
/concerns                           Your Concerns (primary entry point)
/concerns/[concern]                 9 concerns
/treatment-approaches               Treatment Approaches
/treatment-approaches/[approach]    7 approaches
/signature-programmes               Signature Dr Bhagat programmes
/signature-programmes/[programme]   5 programmes
/technology                         Advanced technology, selected with purpose
/technology/[device]                16 devices, reframed as tools within a plan
/results                            Organised by concern
/the-clinic                         Environment, experience, locations, team
/journal                            Expert insight
/journal/[article]
/contact
/book                               Begin with a consultation
```

### Concerns (9)

Facial Ageing & Skin Laxity · Pigmentation & Melasma · Acne & Acne Scars ·
Skin Quality, Texture & Pores · Eyes & Periorbital Ageing · Facial Contouring ·
Hair & Scalp · Body Contouring · Hair Removal

The 30 granular conditions from the previous site become "conditions we see"
within these, rather than separate pages. Medical dermatology (psoriasis,
vitiligo, dermatitis, warts) is acknowledged on the concerns index rather than
forced into an aesthetic concern it does not belong to.

### Treatment approaches (7)

Facial Rejuvenation · Pigmentation · Acne & Scarring · Skin Quality ·
Hair & Scalp · Facial Contouring · Body

Individual procedures no longer have their own pages. They appear inside an
approach as "what a plan may include", which is what stops the site reading as
a menu.

### Signature programmes (5)

The Dr Bhagat Signature Lift · Skin Quality Programme · Pigmentation Programme ·
Acne Scar Programme · Hair Restoration Programme

Each is framed as a combination of modalities decided by the doctor, with
stages, never as a single device.

## Homepage wireframe

| # | Section | Ground | Purpose |
| --- | --- | --- | --- |
| 1 | Hero — Dr Bhagat's / World Class Aesthetics / **Expertise, Elevated.** | Black | Brand, not services |
| 2 | Philosophy — doctor-led, personalised | Bone | "Every face is different…" |
| 3 | Dr Priyam Bhagat & Dr Kamlesh Bhagat | Black | Doctors introduced early |
| 4 | What would you like to improve? | Bone | The 9 concerns |
| 5 | Our approach — Assessment → Plan → Treatment → Follow-up | White | The journey |
| 6 | Signature programmes | Black | Expertise in combination |
| 7 | Advanced technology, selected with purpose | Bone | Supporting evidence |
| 8 | Results, by concern | White | Concern first, device second |
| 9 | The Clinic | Black | Environment and experience |
| 10 | Journal | Bone | Expert insight (hidden until articles exist) |
| 11 | Begin with a consultation | Black | Final call to action |

## Page templates

**Concern:** understanding the concern → how we assess it → our approach →
signature programmes → treatment approaches → technologies that may be used →
conditions we see → book.

**Treatment approach:** philosophy → what we consider → what a plan may include
→ concerns it addresses → technology → book.

**Device:** purpose → where it fits in a plan (concerns first) → a statement that
technology is selected by the doctor, never chosen from a menu → book.

**Results:** grouped by Ageing, Pigmentation, Acne & Scars, Skin Quality, Body,
Hair. The concern leads; the technology used is secondary. Before/after images
render only when consent is recorded against them.

## Content model changes

| Type | Change |
| --- | --- |
| `concern` | Rebuilt as 9 concerns with understanding / assessment / approach fields |
| `treatmentApproach` | **New** — replaces `coreService` |
| `signatureProgramme` | **New** |
| `treatment` | Kept as modalities, now drawn from the previous site's real treatment list; no public pages |
| `machine` | Adds purpose, clinical category and a featured flag, so devices need not have equal prominence |
| `result` | **New** — before/after by concern, with a required consent confirmation |
| `journalArticle` | **New** |
| `clinicSpace`, `teamMember`, `siteSettings` | **New** — for The Clinic page and site imagery |
| `doctor` | Adds biography, expertise, memberships, achievements |
| `coreService`, `technologyPillar` | **Removed** — pillars grouped machines as products |

## Imagery

All stock photography is removed. Every image slot is filled from the Studio
and the layouts are designed to be complete without imagery, so the site
never shows a placeholder or a caption apologising for one.

## Redirects

Every URL from the retired finesseclinic.com site, and every page this site
previously published under `/services`, `/testimonials` and the 30 granular
concerns, redirects permanently to its closest equivalent in this structure.
