# Temporary stock photography

Placeholders only, pending the clinic's photoshoot. Sourced from Unsplash,
whose licence permits commercial use without attribution.

**None of these show this practice, its staff, its premises or its patients.**

## Rules while these are in place

- Never use one as a doctor. The portrait slots on `/about` stay as neutral
  placeholders rather than putting a stock face under a real clinician's name.
- Never use one as a patient, a result, or before/after evidence. That turns a
  placeholder into a misrepresentation, which on a medical site is a real
  problem rather than a cosmetic one.
- Alt text describes the photograph and makes no claim about the clinic.
- Each rendered image carries a visible "Stock image — awaiting clinic
  photography" caption so nobody mistakes it for the practice's own work.

## Replacing them

Upload the real photography in the Studio. `components/EditorialImage.tsx`
prefers a Sanity image whenever one is set, so the swap needs no code change
and the placeholder caption disappears on its own.

Once every slot has real photography: delete this folder, delete
`lib/stockImages.ts`, and drop the `fallback` prop from `EditorialImage`.
