/**
 * Sanity dataset seed and migration.
 *
 *   npx tsx seedSanity.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a
 * write-enabled SANITY_API_WRITE_TOKEN in .env.local.
 *
 * Safe to re-run. Every document is created if missing and then patched with
 * its text fields only, so photography uploaded in the Studio - portraits,
 * clinic spaces, site imagery - is never overwritten by a reseed.
 *
 * It also removes the documents from the previous, technology-led structure:
 * technology pillars, core services, the 30 granular concerns and the old
 * modality list. Those ids are listed explicitly rather than inferred, so a
 * concern added in the Studio is never deleted by accident.
 */
import { createClient, type Transaction } from "@sanity/client";
import { config as loadEnv } from "dotenv";

import {
  APPROACHES,
  ARTICLES,
  CLINIC_SPACES,
  CONCERNS,
  DOCTORS,
  MACHINES,
  MODALITIES,
  PROGRAMMES,
  slug,
  TESTIMONIALS,
} from "./sanity/seed/content";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN (needs write access)");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01",
  useCdn: false,
});

/* ------------------------------------------------------------------ */
/* Ids and references                                                  */
/* ------------------------------------------------------------------ */

const concernSlug = new Map(CONCERNS.map((c) => [c.title, c.slug]));
const programmeSlug = new Map(PROGRAMMES.map((p) => [p.title, p.slug]));

const ids = {
  machine: (name: string) => `machine.${slug(name)}`,
  modality: (name: string) => `treatment.${slug(name)}`,
  concern: (title: string) => {
    const s = concernSlug.get(title);
    if (!s) throw new Error(`Unknown concern: ${title}`);
    return `concern.${s}`;
  },
  approach: (title: string) => `treatmentApproach.${slug(title)}`,
  programme: (title: string) => {
    const s = programmeSlug.get(title);
    if (!s) throw new Error(`Unknown programme: ${title}`);
    return `signatureProgramme.${s}`;
  },
};

const slugField = (value: string) => ({ _type: "slug" as const, current: value });

/** A reference keyed by its target, so array keys stay stable across runs. */
const ref = (id: string) => ({ _type: "reference" as const, _key: id.replace(/\./g, "-"), _ref: id });

/** Plain paragraphs to Portable Text blocks. */
const blocks = (paragraphs: string[]) =>
  paragraphs.map((text, index) => ({
    _type: "block",
    _key: `p${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `p${index}s`, text, marks: [] }],
  }));

/**
 * Create the document if absent, then set only the given fields. Image fields
 * are never included, so a reseed leaves uploaded photography intact.
 */
function upsert(
  tx: Transaction,
  id: string,
  type: string,
  fields: Record<string, unknown>,
  unset: string[] = []
) {
  tx.createIfNotExists({ _id: id, _type: type });
  tx.patch(id, (p) => {
    let patch = p.set(fields);
    if (unset.length) patch = patch.unset(unset);
    return patch;
  });
}

/* ------------------------------------------------------------------ */
/* Legacy structure to remove                                          */
/* ------------------------------------------------------------------ */

const LEGACY = {
  pillars: [
    "high-intensity-body-design",
    "regenerative-medicine",
    "precision-laser-resurfacing",
    "non-surgical-lifting-and-tightening",
    "medical-skin-health-and-barrier-repair",
  ].map((s) => `technologyPillar.${s}`),
  services: [
    "advanced-laser-and-skin-tech",
    "artistry-injectables",
    "medical-skin-and-hair-health",
  ].map((s) => `coreService.${s}`),
  concerns: [
    "acne-scars", "aging", "dry-skin", "psoriasis", "dermatitis", "vitiligo",
    "eye-bags", "sun-damage", "warts", "eyebrow", "lips", "dark-circles",
    "melasma", "hyperpigmentation", "hair-loss", "dandruff", "alopecia-areata",
    "dry-hair", "greasy-hair", "over-damaged-hair", "limp-hair",
    "full-body-contouring", "under-arm-fat", "chin-fat", "belly-fat",
    "thigh-fat", "cellulite", "tattoo-removal",
  ].map((s) => `concern.${s}`),
  modalities: [
    "acne-and-scar-revision", "medical-facials-and-deep-cleansing",
    "skin-tightening-and-body-contouring", "bio-remodelling-and-skin-boosters",
    "pigmentation-and-tattoo-clearance", "lesion-and-blemish-removal",
    "volume-and-contour-restoration", "thread-and-subdermal-lifting",
    "muscle-relaxant-therapy", "hair-restoration-therapy",
  ].map((s) => `treatment.${s}`),
};

/* ------------------------------------------------------------------ */
/* Seed                                                                */
/* ------------------------------------------------------------------ */

async function seed() {
  const tx = client.transaction();

  for (const m of MACHINES) {
    upsert(tx, ids.machine(m.name), "machine", {
      name: m.name,
      slug: slugField(slug(m.name)),
      purpose: m.purpose,
      description: m.description,
      category: m.category,
      featured: m.featured,
    });
  }

  for (const m of MODALITIES) {
    upsert(
      tx,
      ids.modality(m.name),
      "treatment",
      {
        name: m.name,
        slug: slugField(slug(m.name)),
        description: m.description,
        machines: m.machines.map((name) => ref(ids.machine(name))),
      },
      ["image"]
    );
  }

  CONCERNS.forEach((c, order) => {
    upsert(
      tx,
      `concern.${c.slug}`,
      "concern",
      {
        title: c.title,
        slug: slugField(c.slug),
        order,
        summary: c.summary,
        understanding: c.understanding,
        assessment: c.assessment,
        approach: c.approach,
        relatedConditions: c.relatedConditions,
        resultCategory: c.resultCategory,
        programmes: c.programmes.map((t) => ref(ids.programme(t))),
        approaches: c.approaches.map((t) => ref(ids.approach(t))),
        technologies: c.technologies.map((name) => ref(ids.machine(name))),
      },
      // Fields from the previous concern shape.
      ["category", "description", "treatments"]
    );
  });

  APPROACHES.forEach((a, order) => {
    upsert(tx, ids.approach(a.title), "treatmentApproach", {
      title: a.title,
      slug: slugField(slug(a.title)),
      order,
      summary: a.summary,
      philosophy: a.philosophy,
      considerations: a.considerations,
      modalities: a.modalities.map((name) => ref(ids.modality(name))),
      concerns: a.concerns.map((t) => ref(ids.concern(t))),
      technologies: a.technologies.map((name) => ref(ids.machine(name))),
    });
  });

  PROGRAMMES.forEach((p, order) => {
    upsert(tx, `signatureProgramme.${p.slug}`, "signatureProgramme", {
      title: p.title,
      slug: slugField(p.slug),
      order,
      summary: p.summary,
      forWhom: p.forWhom,
      approach: p.approach,
      stages: p.stages.map((stage, index) => ({ _key: `s${index}`, ...stage })),
      concerns: p.concerns.map((t) => ref(ids.concern(t))),
      approaches: p.approaches.map((t) => ref(ids.approach(t))),
    });
  });

  for (const d of DOCTORS) {
    upsert(
      tx,
      `doctor.${slug(d.name)}`,
      "doctor",
      {
        name: d.name,
        slug: slugField(slug(d.name)),
        role: d.role,
        order: d.order,
        shortBio: d.shortBio,
        biography: d.biography,
        qualifications: d.qualifications,
      },
      ["bio"]
    );
  }

  for (const t of TESTIMONIALS) {
    upsert(
      tx,
      `testimonial.${slug(t.author)}`,
      "testimonial",
      {
        author: t.author,
        quote: t.quote,
        source: "google",
        featured: t.featured ?? false,
        ...(t.category ? { category: t.category } : {}),
      },
      // Dates on the previous site were not reliable, so they are dropped.
      t.category ? ["date"] : ["date", "category"]
    );
  }

  CLINIC_SPACES.forEach((space, order) => {
    upsert(tx, `clinicSpace.${slug(space.title)}`, "clinicSpace", {
      title: space.title,
      description: space.description,
      order,
      location: "both",
    });
  });

  for (const a of ARTICLES) {
    upsert(tx, `journalArticle.${slug(a.title)}`, "journalArticle", {
      title: a.title,
      slug: slugField(slug(a.title)),
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
      body: blocks(a.paragraphs),
    });
  }

  tx.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });

  // Referrers go before the documents they point at.
  for (const id of [...LEGACY.concerns, ...LEGACY.services, ...LEGACY.pillars]) tx.delete(id);
  for (const id of LEGACY.modalities) tx.delete(id);

  console.log(
    `Seeding ${CONCERNS.length} concerns, ${APPROACHES.length} approaches, ` +
      `${PROGRAMMES.length} programmes, ${MODALITIES.length} modalities, ` +
      `${MACHINES.length} technologies, ${DOCTORS.length} doctors, ` +
      `${TESTIMONIALS.length} testimonials, ${ARTICLES.length} articles and ` +
      `${CLINIC_SPACES.length} clinic spaces into ${projectId}/${dataset}...`
  );

  await tx.commit();
  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
