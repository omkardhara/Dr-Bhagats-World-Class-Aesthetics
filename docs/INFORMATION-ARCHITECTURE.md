# Information architecture

Revised in response to the doctors' two rounds of feedback, September 2026.

## The principle

> The doctor decides. Technology supports. The patient receives a personalised plan.

Machines are our tools. Clinical expertise is our product. The Dr Bhagat's
experience is our brand.

The previous structure implied **machine → procedure → booking**. The site is
organised around the patient's journey instead:

**Concern → doctor's assessment → personalised strategy → appropriate technology → results**

The patient should never have to understand the technology portfolio before
understanding how the practice can help them. Every concern page follows that
order literally, and technology is always the last thing a page introduces.

## Brand language

| Role | Line |
| --- | --- |
| Primary tagline | **Expertise, Elevated.** |
| Signature philosophy — recurs across the site | **Considered treatment, not a menu.** |
| Philosophy, explained | We don't believe in one treatment for everyone. We believe in understanding the individual, identifying what needs to change, and choosing the right combination of treatments to achieve refined, natural results. |
| Supporting | Where dermatological expertise meets the art of aesthetics. |
| Supporting | Every face is different. Every treatment plan should be too. |
| Signature | Personalised by expertise. Refined by experience. |

"Considered treatment, not a menu." leads every closing consultation block, the
booking page and the footer, and heads the Treatment Approaches page.

## Navigation

Home · About · Your Concerns · The Dr Bhagat's Signature · Treatment Approaches ·
Technology · Results · The Clinic · Journal

**Book a Consultation** is the one persistent, dominant button. Contact is not in
the navigation: contact details sit in the footer and on the booking page.

From 1280px the header has two rows — logo and Book a Consultation, then the nine
destinations — so every label reads in full. Below 1280px, a full-screen menu.

## Sitemap

```
/                                   Home
/about                              About Dr Bhagat's and the doctors
/concerns                           Your Concerns (primary entry point)
/concerns/[concern]                 9 concerns
/signature                          The Dr Bhagat's Signature Approach (all 5 programmes)
/treatment-approaches               Treatment Approaches
/treatment-approaches/[approach]    7 approaches
/technology                         Technology, selected with purpose (cards by category)
/technology/[device]                Signature technologies only (currently 3)
/results                            Organised by concern
/the-clinic                         Environment, experience, locations, team
/journal                            Expert knowledge
/journal/[article]
/book                               Begin with a consultation — booking and contact details
```

### Concerns (9)

Facial Ageing & Skin Laxity · Pigmentation & Melasma · Acne & Acne Scars ·
Skin Quality, Texture & Pores · Eyes & Periorbital Ageing · Facial Contouring ·
Hair & Scalp · Body Contouring · Hair Removal

The 30 granular conditions from the previous site are "conditions we see" within
these. Medical dermatology (psoriasis, vitiligo, dermatitis, warts) is
acknowledged on the concerns index.

### The Dr Bhagat's Signature (5)

The Signature Lift · The Signature Skin Quality Programme · The Signature
Pigmentation Programme · The Signature Acne Scar Programme · The Signature
Hair & Scalp Programme

One page, in the doctors' words: hero, introduction, the five programmes, then a
large quiet close — *Your face. Your skin. Your plan.* Technologies are never
listed under a programme; each carries only the line "Technologies and
treatments may be selected according to individual assessment", with a single
link to Technology afterwards.

### Treatment approaches (7)

Facial Rejuvenation · Pigmentation · Acne & Scarring · Skin Quality ·
Hair & Scalp · Facial Contouring · Body

### Technology

Headline *Technology, selected with purpose.* Five categories, in the doctors'
order: Energy-based technology · Lasers · Lifting & tightening · Skin
rejuvenation · Regenerative dermatology.

Every technology is a small card of equal size; a technology may appear in more
than one category. Only signature technologies get a dedicated page (Endolift X,
Thermage FLX and Ultraformer MPT, switchable per technology in the Studio). The
address of any other technology redirects to its card, so the portfolio never
becomes a row of competing heroes.

## Homepage

| # | Section | Ground |
| --- | --- | --- |
| 01 | Hero — Dr Bhagat's World Class Aesthetics · Expertise, Elevated. | Black |
| 02 | Doctor-led philosophy — Considered treatment, not a menu. | Bone |
| 03 | The doctors — Dr Priyam Bhagat & Dr Kamlesh Bhagat | Black |
| 04 | Your concerns — What would you like to improve? | Bone |
| 05 | Our approach — Assess → Diagnose → Personalise → Treat → Refine | White |
| 06 | The Dr Bhagat's Signature — Signature Lift, Skin Quality, Pigmentation, Acne Scars, Hair | Black |
| 07 | Technology — Advanced technology, selected with purpose. | Bone |
| 08 | Results — organised by concern | White |
| 09 | The Clinic — a luxury medical experience | Black |
| 10 | Journal — expert knowledge (hidden until articles exist) | Bone |
| 11 | Begin with a consultation. | Black |

## Page templates

**About:** A legacy of dermatology. A future of aesthetics. → Expertise, Elevated.
(introduction) → each doctor: position, name, title, specialty, large portrait,
biography, then qualifications, years of experience, areas of expertise,
conferences, publications, awards, technologies and philosophy → Two doctors. One
standard of care. → Our philosophy → The Dr Bhagat's Approach → The experience →
Expertise, Elevated. → Begin with a consultation. A credential section with no
confirmed details is omitted rather than shown empty.

**Concern:** understanding the concern → how we assess it → our approach →
the Dr Bhagat's Signature → treatment approaches → technology that may be used →
conditions we see → book.

**Booking (replaces Contact):** Begin with a consultation. → the request form →
for each clinic: location, phone, WhatsApp, email, opening hours, directions
(confirmed details only).

**Results:** grouped by Ageing, Pigmentation, Acne & Scars, Skin Quality, Body,
Hair. Before/after images render only when consent is recorded against them.

## Content model

| Type | Notes |
| --- | --- |
| `concern` | 9 concerns with understanding / assessment / approach fields |
| `signatureProgramme` | Title, short title, tagline, description, closing line. No technology field, by design |
| `treatmentApproach` | 7 approaches |
| `treatment` | Modalities within approaches; no public pages |
| `machine` | Card line, categories (several allowed), `dedicatedPage` |
| `doctor` | Position, title, specialty, biography, philosophy quote, and optional credentials: qualifications, practising since, expertise, conferences, publications, awards, technologies, memberships |
| `result` | Before/after by concern, with a required consent confirmation |
| `journalArticle`, `clinicSpace`, `teamMember`, `siteSettings` | Journal, The Clinic and site imagery |

## Imagery

All stock photography is removed. Every image slot is filled from the Studio and
the layouts are complete without imagery, so the site never shows a placeholder.

## Redirects

Every URL from the retired finesseclinic.com site, and every page this site
previously published — `/services`, `/testimonials`, `/contact`, the 30 granular
concerns, the individual `/signature-programmes` pages and non-signature
technology pages — redirects permanently to its closest equivalent here.
