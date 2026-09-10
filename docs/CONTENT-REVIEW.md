# Content review and launch checklist

What the doctors and the clinic need to supply or approve before launch. Nothing in this list can be completed from the code side without inventing information.

## 1. Sign-off on structure first

Dr Bhagat asked to approve the sitemap and homepage wireframe before detailed design. Both are in [`INFORMATION-ARCHITECTURE.md`](./INFORMATION-ARCHITECTURE.md), and the site as built follows that document exactly. Any change requested there is cheap to make now.

## 2. Clinical copy

All clinical copy was drafted from the practice's existing material and the feedback. It deliberately makes no outcome claims, but it has not been reviewed by a clinician. It lives in Sanity, so each item below can be edited directly in the Studio at `/studio`.

| Where | What to review |
| --- | --- |
| Your Concerns (9) | Summary, "Understanding the concern", "How we assess it", "Our approach", conditions listed, FAQs |
| Treatment Approaches (7) | Summary, philosophy, what the doctor considers, which modalities are listed |
| Signature Programmes (5) | Who it is for, the approach, the four stages of each programme |
| Technology (16) | Purpose line and description for each device; which six are featured |
| Journal (3) | The three opening articles |
| Medical dermatology | Confirm psoriasis, vitiligo, dermatitis and warts is the right list |

## 3. The doctors

The About page no longer contains any placeholder text. Sections without content are hidden, so these fields currently do not appear:

- **Expertise, memberships and achievements** for Dr Priyam Bhagat and Dr Kamlesh Bhagat. A current CV for each is the quickest route.
- **Biographies**: the current versions only restate verified training (Seth GS Medical College & KEM Hospital, American Academy of Aesthetic Medicine, University of Miami). Please expand or correct.
- **Portraits**: upload in Studio → Doctors. The page layout changes to a portrait layout automatically once they exist.

## 4. Photography

All stock imagery has been removed. Every image slot below is empty until the clinic's own photography is uploaded; pages are designed to read as complete without them.

| Studio location | Slot | Suggested shot |
| --- | --- | --- |
| Site Settings | Hero image | Doctor with patient in consultation, or the reception |
| Site Settings | Philosophy image | Detail of consultation, hands, skin assessment |
| Site Settings | Clinic image | Wide interior |
| Doctors | Portrait (×2) | Environmental portraits in clinic, 3:4 |
| The Clinic spaces | Images | Reception, consultation rooms, treatment rooms, technology. A space only appears once it has at least one image |
| Team members | Portrait | Optional; the team section appears once a member is added |
| Concerns / Approaches / Programmes / Articles | Image | Optional per page |
| Technology | Image | Optional. Show the device in use by a doctor, not as a product shot |

## 5. Results and testimonials — compliance

- The Results page shows **only** before-and-after cases where "Patient consent confirmed" is ticked. The Studio will not let a result be published without it.
- Before publishing clinical photographs or patient testimonials, confirm the position under the **National Medical Commission's professional conduct and advertising regulations**. They restrict how registered medical practitioners may advertise; a short review by the practice's advisers is recommended.
- The eight testimonials on the site are verbatim excerpts from existing public Google reviews. Please confirm the practice is comfortable featuring them.

## 6. Contact details

The following are unconfirmed and are therefore not shown anywhere on the site, nor in structured data sent to Google:

- Goregaon East telephone number
- Confirmation that the Vashi number (+91 22 4004 8149) is still correct
- Email address(es)
- Opening hours for each clinic
- Google Maps links

These must match the Google Business Profile listings exactly.

## 7. Booking

`/book` collects nothing. It displays an honest notice and directs visitors to the contact page. Before it can send requests, decide:

- where requests go (clinic email, WhatsApp Business, a practice-management system, or a booking service)
- the privacy notice, since the form asks about health concerns (Digital Personal Data Protection Act, 2023)
- who responds, and within what time

## 8. Domains

Keep `finesseclinic.com` registered, and point it at this site so the redirects in `lib/redirects.ts` preserve existing search traffic.
