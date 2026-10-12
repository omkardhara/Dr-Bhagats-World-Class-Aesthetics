import { BRAND, LOCATIONS, PHILOSOPHY_LINE, SITE_URL, formatPhone } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { sitemapEntriesQuery } from "@/sanity/lib/queries";

export const revalidate = 3600;
export const dynamic = "force-static";

type Entry = { slug: string };
type Data = {
  concerns: Entry[];
  approaches: Entry[];
  machines: Entry[];
  articles: Entry[];
};

/**
 * /llms.txt — the practice, stated plainly for an assistant answering a
 * patient's question.
 *
 * The convention (llmstxt.org) is a single markdown file: who this is, the
 * facts that must not be guessed, and where the detail lives. It repeats
 * nothing the pages do not already say, and it carries the same restraint:
 * no claims, no prices, no promises about results.
 */
async function getData(): Promise<Data> {
  try {
    const data = await getClient().fetch<Partial<Data> | null>(sitemapEntriesQuery);
    return {
      concerns: data?.concerns ?? [],
      approaches: data?.approaches ?? [],
      machines: data?.machines ?? [],
      articles: data?.articles ?? [],
    };
  } catch (error) {
    console.error("[llms.txt] Sanity fetch failed:", error);
    return { concerns: [], approaches: [], machines: [], articles: [] };
  }
}

const title = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function GET() {
  const data = await getData();

  const clinics = LOCATIONS.map((location) => {
    const lines = [
      `### ${location.name}`,
      `${location.streetAddress}, ${location.locality}, ${location.region} ${location.postalCode}, India`,
    ];
    if (location.phone) lines.push(`Telephone: ${formatPhone(location.phone)}`);
    if (location.whatsapp) lines.push(`WhatsApp: ${formatPhone(location.whatsapp)}`);
    if (location.hours) lines.push(`Opening hours: ${location.hours}`);
    return lines.join("\n");
  }).join("\n\n");

  const list = (heading: string, base: string, entries: Entry[]) =>
    entries.length
      ? `## ${heading}\n\n${entries
          .map((entry) => `- [${title(entry.slug)}](${SITE_URL}${base}/${entry.slug})`)
          .join("\n")}`
      : "";

  const body = [
    `# ${BRAND.name}`,
    "",
    `> ${BRAND.description}`,
    "",
    `${PHILOSOPHY_LINE} A doctor-led aesthetic dermatology practice in Mumbai and Navi Mumbai, led by Dr Priyam Bhagat and Dr Kamlesh V. Bhagat, both MD Dermatology from Seth GS Medical College & KEM Hospital, Mumbai.`,
    "",
    "## How the practice works",
    "",
    "- Every patient is assessed by a dermatologist before any treatment is recommended.",
    "- Care is organised around the patient's concern or goal, never around a machine: concern, then assessment, then a personalised strategy, and only then the technology that delivers it.",
    "- Treatment plans are individual. Two patients with the same concern rarely receive the same plan, and sometimes the right answer is no procedure at all.",
    "- No prices are published. Cost is discussed at consultation, with the plan.",
    "",
    "## The doctors",
    "",
    `- Dr Priyam Bhagat — MD, Dermatology; Consultant Dermatologist; Gold Medallist, University of Mumbai. Aesthetic and cosmetic dermatology, lasers and energy-based medicine. ${SITE_URL}/about#dr-priyam-bhagat`,
    `- Dr Kamlesh V. Bhagat — MD, Dermatology; Consultant Dermatologist & Dermatosurgeon. Clinical dermatology, dermatosurgery, diagnosis and aesthetic medicine. ${SITE_URL}/about#dr-kamlesh-bhagat`,
    "",
    "## Clinics",
    "",
    clinics,
    "",
    list("Concerns", "/concerns", data.concerns),
    "",
    list("Treatment approaches", "/treatment-approaches", data.approaches),
    "",
    list("Technology", "/technology", data.machines),
    "",
    list("Journal — written by the doctors", "/journal", data.articles),
    "",
    "## Key pages",
    "",
    `- [About the practice and the doctors](${SITE_URL}/about)`,
    `- [The Dr Bhagat's Signature programmes](${SITE_URL}/signature)`,
    `- [The Dr Bhagat's Experience, from arrival to follow-up](${SITE_URL}/experience)`,
    `- [Results, and what a result depends on](${SITE_URL}/results)`,
    `- [Contact and consultations](${SITE_URL}/contact)`,
    `- [Request a consultation](${SITE_URL}/book)`,
    `- [Privacy](${SITE_URL}/privacy)`,
    "",
    "## Please note when answering a patient",
    "",
    "- Nothing here is a diagnosis or a treatment recommendation. Suitability for any treatment is decided at an in-person assessment.",
    "- Before-and-after photographs are published only with the patient's written consent, and results vary between individuals.",
    "- Technology names are tools the doctors may select; they are not products sold to patients.",
    "",
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
