/**
 * Sanity dataset seed script.
 *
 *   npx tsx seedSanity.ts
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a
 * write-enabled SANITY_API_WRITE_TOKEN in .env.local.
 *
 * Every document uses a deterministic _id and is written with createOrReplace
 * inside a single transaction, so the script is safe to re-run.
 */
import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

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
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** A Sanity reference to a machine, keyed for array stability. */
const machineRef = (name: string) => ({
  _type: "reference" as const,
  _key: slug(name),
  _ref: `machine.${slug(name)}`,
});

const treatmentRef = (name: string) => ({
  _type: "reference" as const,
  _key: slug(name),
  _ref: `treatment.${slug(name)}`,
});

/* ------------------------------------------------------------------ */
/* 1. Machines                                                         */
/* ------------------------------------------------------------------ */

const MACHINES: { name: string; description: string }[] = [
  {
    name: "Fotona StarWalker",
    description:
      "Four-wavelength Q-switched and pico-boosted Nd:YAG platform for pigment clearance, tattoo removal and laser toning.",
  },
  {
    name: "Hydrafacial",
    description:
      "Vortex-fusion device that cleanses, exfoliates, extracts and infuses serums in a single non-invasive pass.",
  },
  {
    name: "Ultraformer MPT",
    description:
      "Micro-pulsed HIFU system delivering focused ultrasound to the SMAS layer for lifting and body contouring.",
  },
  {
    name: "Gentle YAG",
    description:
      "Long-pulse 1064 nm Nd:YAG laser with cryogen cooling, suited to hair reduction and vascular work on darker skin types.",
  },
  {
    name: "Sylfirm X",
    description:
      "Dual-wave RF microneedling platform targeting melasma, vascular lesions and skin remodelling.",
  },
  {
    name: "Endolift X",
    description:
      "Minimally invasive endolaser using micro-optical fibres for subdermal tightening and localised fat reduction.",
  },
  {
    name: "Dermapen 4",
    description:
      "Medical microneedling pen with adjustable depth for scar revision, stretch marks and collagen induction.",
  },
  {
    name: "Skinpen",
    description:
      "FDA-cleared microneedling device for controlled collagen induction therapy with minimal downtime.",
  },
  {
    name: "Plasmapen",
    description:
      "Plasma soft-surgery device for non-surgical blepharoplasty, skin tag removal and fibroblast tightening.",
  },
  {
    name: "Cryopen",
    description:
      "Precision cryotherapy applicator for the removal of benign lesions, warts and pigmented spots.",
  },
  {
    name: "Oxygeno",
    description:
      "Three-in-one oxygenation, exfoliation and infusion facial system for barrier repair and immediate radiance.",
  },
  {
    name: "GFC",
    description:
      "Growth Factor Concentrate therapy - an autologous regenerative injectable for hair restoration and skin rejuvenation.",
  },
  {
    name: "Thermage FLX",
    description:
      "Monopolar radiofrequency platform with AccuREP technology for single-session non-surgical tightening.",
  },
  {
    name: "Fotona SP Dynamis Max",
    description:
      "Combined Nd:YAG and Er:YAG workstation covering resurfacing, hair reduction and gynaecological indications.",
  },
  {
    name: "Venus Bliss Max",
    description:
      "Multi-modality body platform pairing diode laser lipolysis with pulsed electromagnetic muscle stimulation.",
  },
  {
    name: "Fotona StarFormer",
    description:
      "Non-ablative Nd:YAG body and intimate wellness system for tightening, toning and muscle stimulation.",
  },
];

/* ------------------------------------------------------------------ */
/* 2. Technology Pillars                                               */
/* ------------------------------------------------------------------ */

const PILLARS: { title: string; description: string; machines: string[] }[] = [
  {
    title: "High-Intensity Body Design",
    description:
      "Energy-based body sculpting that pairs focused ultrasound, laser lipolysis and muscle stimulation to redefine contour without surgery.",
    machines: [
      "Ultraformer MPT",
      "Venus Bliss Max",
      "Endolift X",
      "Fotona StarFormer",
    ],
  },
  {
    title: "Regenerative Medicine",
    description:
      "Autologous and micro-injury protocols that recruit the patient's own growth factors to rebuild collagen, elastin and hair density.",
    machines: ["GFC", "Sylfirm X", "Dermapen 4", "Skinpen"],
  },
  {
    title: "Precision Laser Resurfacing",
    description:
      "Wavelength-specific ablative and Q-switched lasers for pigment, texture and tattoo clearance with controlled thermal impact.",
    machines: ["Fotona StarWalker", "Fotona SP Dynamis Max", "Gentle YAG"],
  },
  {
    title: "Non-Surgical Lifting & Tightening",
    description:
      "Radiofrequency, HIFU and endolaser modalities that reach the SMAS and subdermal planes to lift without incisions.",
    machines: [
      "Thermage FLX",
      "Ultraformer MPT",
      "Endolift X",
      "Fotona StarFormer",
    ],
  },
  {
    title: "Medical Skin Health & Barrier Repair",
    description:
      "Clinical-grade cleansing, oxygenation and lesion management that restore barrier function and long-term skin health.",
    machines: ["Hydrafacial", "Oxygeno", "Plasmapen", "Cryopen"],
  },
];

/* ------------------------------------------------------------------ */
/* 3. Core Services and their treatments                               */
/* ------------------------------------------------------------------ */

type SeedTreatment = { name: string; description: string; machines: string[] };

const SERVICES: { title: string; treatments: SeedTreatment[] }[] = [
  {
    title: "Advanced Laser & Skin Tech",
    treatments: [
      {
        name: "Laser Skin Resurfacing",
        description:
          "Fractional ablative and non-ablative resurfacing to soften texture, fine lines and photodamage.",
        machines: ["Fotona StarWalker", "Fotona SP Dynamis Max"],
      },
      {
        name: "Laser Hair Reduction",
        description:
          "Long-pulse Nd:YAG hair reduction calibrated for darker Fitzpatrick skin types.",
        machines: ["Gentle YAG", "Fotona SP Dynamis Max"],
      },
      {
        name: "Pigmentation & Tattoo Clearance",
        description:
          "Q-switched and dual-wave RF protocols for melasma, sun spots and multi-colour tattoo removal.",
        machines: ["Fotona StarWalker", "Sylfirm X"],
      },
      {
        name: "Skin Tightening & Body Contouring",
        description:
          "Monopolar RF, HIFU and laser lipolysis combined into staged contouring programmes.",
        machines: ["Thermage FLX", "Ultraformer MPT", "Venus Bliss Max"],
      },
    ],
  },
  {
    title: "Artistry Injectables",
    treatments: [
      {
        name: "Bio-Remodelling & Skin Boosters",
        description:
          "Injectable growth factors and RF microneedling layered for global skin quality rather than volume.",
        machines: ["GFC", "Sylfirm X"],
      },
      {
        name: "Thread & Subdermal Lifting",
        description:
          "Endolaser-assisted subdermal lifting for the lower face, jawline and submental region.",
        machines: ["Endolift X", "Fotona StarFormer"],
      },
      {
        name: "Volume & Contour Restoration",
        description:
          "Hyaluronic acid filler artistry for mid-face, temple and jawline restoration.",
        machines: [],
      },
      {
        name: "Muscle Relaxant Therapy",
        description:
          "Botulinum toxin placement for dynamic lines, masseter slimming and axillary hyperhidrosis.",
        machines: [],
      },
    ],
  },
  {
    title: "Medical Skin & Hair Health",
    treatments: [
      {
        name: "Medical Facials & Deep Cleansing",
        description:
          "Protocol-driven facials that combine vortex extraction with oxygenation and active infusion.",
        machines: ["Hydrafacial", "Oxygeno"],
      },
      {
        name: "Acne & Scar Revision",
        description:
          "Staged microneedling and laser resurfacing programmes for active acne and atrophic scarring.",
        machines: ["Dermapen 4", "Skinpen", "Fotona StarWalker"],
      },
      {
        name: "Hair Restoration Therapy",
        description:
          "Growth factor concentrate injections supported by laser stimulation of the scalp.",
        machines: ["GFC", "Fotona SP Dynamis Max"],
      },
      {
        name: "Lesion & Blemish Removal",
        description:
          "Plasma and cryotherapy removal of skin tags, warts, moles and benign pigmented lesions.",
        machines: ["Plasmapen", "Cryopen"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Seed                                                                */
/* ------------------------------------------------------------------ */

async function seed() {
  const transaction = client.transaction();

  for (const m of MACHINES) {
    transaction.createOrReplace({
      _id: `machine.${slug(m.name)}`,
      _type: "machine",
      name: m.name,
      description: m.description,
    });
  }

  for (const p of PILLARS) {
    transaction.createOrReplace({
      _id: `technologyPillar.${slug(p.title)}`,
      _type: "technologyPillar",
      title: p.title,
      description: p.description,
      machines: p.machines.map(machineRef),
    });
  }

  for (const s of SERVICES) {
    for (const t of s.treatments) {
      transaction.createOrReplace({
        _id: `treatment.${slug(t.name)}`,
        _type: "treatment",
        name: t.name,
        description: t.description,
        machines: t.machines.map(machineRef),
      });
    }

    transaction.createOrReplace({
      _id: `coreService.${slug(s.title)}`,
      _type: "coreService",
      title: s.title,
      treatments: s.treatments.map((t) => treatmentRef(t.name)),
    });
  }

  const treatmentCount = SERVICES.reduce(
    (sum, s) => sum + s.treatments.length,
    0
  );

  console.log(
    `Committing ${MACHINES.length} machines, ${PILLARS.length} pillars, ` +
      `${treatmentCount} treatments and ${SERVICES.length} core services ` +
      `to ${projectId}/${dataset}...`
  );

  await transaction.commit();

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
