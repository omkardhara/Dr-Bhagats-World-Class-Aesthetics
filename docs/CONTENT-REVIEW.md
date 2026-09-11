# Content review and launch checklist

What the doctors and the clinic need to supply or approve before launch. Nothing in this list can be completed from the code side without inventing information.

## 1. Sign-off on structure

The sitemap, navigation, homepage flow and page templates are in [`INFORMATION-ARCHITECTURE.md`](./INFORMATION-ARCHITECTURE.md), revised after the doctors' second round of feedback. The site as built follows that document.

## 2. The doctors — the About page

The doctors' own copy is used throughout. Any credential section without confirmed details is hidden, so these do not yet appear:

| Field (Studio → Doctors → Credentials) | Dr Priyam Bhagat | Dr Kamlesh Bhagat |
| --- | --- | --- |
| In practice since (shown as years of experience) | needed | needed |
| Conferences | needed | needed |
| Publications | if applicable | if applicable |
| Awards | needed | needed |
| Technologies | needed | needed |
| Memberships | optional | optional |
| Large professional portrait (3:4) | needed | needed |

Please also check:

- **Qualifications and training** currently lists Seth GS Medical College & KEM Hospital, the American Academy of Aesthetic Medicine and the University of Miami, carried over from the previous site. Confirm or correct, and add degrees (for example MBBS, MD, DVL).
- **Areas of expertise** were taken from each biography. Dr Kamlesh Bhagat's list (clinical dermatology, aesthetic dermatology, long-term patient care) is the thinner of the two.
- **Position** is "Co-Founder" for both, from "Founded by Dr Priyam Bhagat and Dr Kamlesh Bhagat".

## 3. Copy written on your behalf

Everything else in the doctors' feedback is reproduced as written. These pieces were drafted to fill a gap and need approval:

- **The five approach steps** — short descriptions under Assess, Diagnose, Personalise, Treat and Refine.
- **Technology card lines** — one line for each technology.
- **The 9 concerns and 7 treatment approaches** — understanding, assessment and approach text, written without outcome claims.
- **Homepage Clinic section** — adapted from "The experience" on the About page.
- **The 3 journal articles.**
- **Homepage philosophy line** — "Our real difference is clinical judgement and experience…", adapted from the first round of feedback.
- **Clinic space descriptions** — Architecture, Reception, Consultation rooms, Treatment rooms, Details and Technology. Each appears only once photographed.
- **Directions links** — currently a Google Maps search for each confirmed street address. Replace with each clinic's Google Business Profile link once available.

Open questions from the feedback:

- **"RF technologies" under Lifting & tightening** — Thermage FLX is listed there. Should Sylfirm X (RF microneedling) also appear under Lifting & tightening, or stay in Energy-based and Skin rejuvenation?
- **Results** — categories appear only once they have a consented case or a patient review, so Ageing and Body are not yet shown.

## 4. Technology

| Item | Question |
| --- | --- |
| Dedicated pages | Endolift X, Thermage FLX and Ultraformer MPT have their own page. Confirm, or name the signature technologies. Switch per technology in the Studio. |
| GentleYAG, OxyGeneo, SkinPen | Renamed to the spellings in the feedback. Confirm each is in use. |
| Exosomes | Added from the feedback. Please confirm the regulatory status of the exosome product used before it is promoted publicly. |
| Cryopen | Fits none of the five categories, so it is not shown. Assign a category in the Studio to show it. |
| Categories | Several technologies appear in two categories (for example Thermage FLX in Energy-based and Lifting & tightening). Confirm the placements. |

## 5. Photography

All stock imagery has been removed. Every image slot below is empty until the clinic's own photography is uploaded; pages read as complete without them.

| Studio location | Slot | Suggested shot |
| --- | --- | --- |
| Site Settings | Hero image | Doctor with patient in consultation, or the reception |
| Site Settings | Philosophy image | Detail of consultation, skin assessment |
| Site Settings | Clinic image | Wide interior |
| Doctors | Portrait (×2) | Large professional portraits in clinic, 3:4 |
| The Clinic spaces | Images | Reception, consultation rooms, treatment rooms. A space appears once it has an image |
| Signature Programmes | Image | Optional, per programme |
| Technology | Image | Dedicated pages only. The technology in a doctor's hands, not a product shot |

## 6. Results and testimonials — compliance

- The Results page shows only before-and-after cases where "Patient consent confirmed" is ticked. The Studio will not publish a result without it.
- Before publishing clinical photographs or patient testimonials, confirm the position under the **National Medical Commission's professional conduct and advertising regulations**.
- The eight testimonials are verbatim excerpts from existing public Google reviews.

## 7. Contact details

Shown on the booking page and in the footer — but only once confirmed:

- Goregaon East telephone number
- Confirmation that the Vashi number (+91 22 4004 8149) is still correct
- WhatsApp number(s)
- Email address(es)
- Opening hours for each clinic
- Google Maps links

These must match the Google Business Profile listings exactly.

## 8. Booking

`/book` collects nothing yet. It says so, and points visitors to the clinic details beside the form. Before it can send requests, decide:

- where requests go (clinic email, WhatsApp Business, a practice-management system or a booking service)
- the privacy notice, since the form asks about health concerns (Digital Personal Data Protection Act, 2023)
- who responds, and within what time

## 9. Domains

Keep `finesseclinic.com` registered, and point it at this site so the redirects in `lib/redirects.ts` preserve existing search traffic.
