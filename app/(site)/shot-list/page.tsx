import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import { PageHero, PrimaryLink, Rail, Rows, Section, TextLink } from "@/components/ui";
import {
  APPROACH_SHOTS,
  ART_DIRECTION,
  ARTICLE_SHOTS,
  CONCERN_SHOTS,
  DOCTOR_SHOTS,
  FORMAT,
  PROGRAMME_SHOTS,
  shotListEnabled,
  SITE_SHOTS,
  SPACE_SHOTS,
  technologyShot,
  type Brief,
} from "@/lib/shotList";

export const metadata: Metadata = {
  title: "Photography shot list",
  robots: { index: false, follow: false },
};

/** Dedicated technology pages, each with one hero photograph. */
const TECHNOLOGIES: [string, string][] = [
  ["thermage-flx", "Thermage FLX"],
  ["ultraformer-mpt", "Ultraformer MPT"],
  ["endolift-x", "Endolift X"],
  ["sylfirm-x", "Sylfirm X"],
  ["fotona-sp-dynamis-max", "Fotona SP Dynamis Max"],
  ["fotona-starwalker", "Fotona StarWalker"],
  ["gentleyag", "GentleYAG"],
];

type Shot = Brief & { format: string; where: string; href: string };

const shot = (brief: Brief, ratio: string, where: string, href: string): Shot => ({
  ...brief,
  format: FORMAT[ratio],
  where,
  href,
});

const GROUPS: { title: string; shots: Shot[] }[] = [
  {
    title: "Home",
    shots: [
      shot(SITE_SHOTS.homeHero, "hero", "Home - opening image", "/"),
      shot(SITE_SHOTS.homePhilosophy, "4/3", "Home - doctor-led philosophy", "/"),
      shot(SITE_SHOTS.homeClinic, "4/3", "Home - the clinic", "/"),
    ],
  },
  {
    title: "The doctors",
    shots: [
      ...Object.values(DOCTOR_SHOTS).map((brief) =>
        shot(brief, "3/4", "Home and About - the doctors", "/about#doctors")
      ),
      shot(SITE_SHOTS.aboutDoctors, "21/9", "About - the doctors", "/about#doctors"),
    ],
  },
  {
    title: "The clinic",
    shots: [
      ...Object.values(SPACE_SHOTS).flatMap((briefs) =>
        briefs.map((brief) => shot(brief, "4/3", "About - the clinic", "/about#the-clinic"))
      ),
      shot(SITE_SHOTS.team, "3/4", "About - the team (one per team member)", "/about#the-clinic"),
    ],
  },
  {
    title: "Concerns",
    shots: Object.entries(CONCERN_SHOTS).map(([slug, brief]) =>
      shot(brief, "21/9", "Concern page - opening image", `/concerns/${slug}`)
    ),
  },
  {
    title: "Treatment approaches",
    shots: Object.entries(APPROACH_SHOTS).map(([slug, brief]) =>
      shot(brief, "21/9", "Treatment approach - opening image", `/treatment-approaches/${slug}`)
    ),
  },
  {
    title: "Signature programmes",
    shots: Object.entries(PROGRAMME_SHOTS).map(([slug, brief]) =>
      shot(brief, "16/9", "Signature page - programme image", `/signature#${slug}`)
    ),
  },
  {
    title: "Technology",
    shots: TECHNOLOGIES.map(([slug, name]) =>
      shot(technologyShot(name), "21/9", "Technology page - opening image", `/technology/${slug}`)
    ),
  },
  {
    title: "Journal",
    shots: Object.entries(ARTICLE_SHOTS).map(([slug, brief]) =>
      shot(brief, "21/9", "Article - opening image (also cropped 4:3 on the Journal page)", `/journal/${slug}`)
    ),
  },
];

const TOTAL = GROUPS.reduce((sum, group) => sum + group.shots.length, 0);

/**
 * The photography brief for the doctors and the photographer: every image the
 * site is designed to hold, where it sits and what it should show. Not linked
 * from the site and not indexed.
 */
export default async function ShotListPage() {
  const previewing = await shotListEnabled();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Photography"
        title="The shot list."
        lead={`${TOTAL} photographs, each written for the place it will sit on the site. Switch on the preview to see every one as a framed placeholder, in position and at its final shape.`}
      >
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          {previewing ? (
            <>
              <PrimaryLink href="/">See the site with placeholders</PrimaryLink>
              <TextLink href="/api/shot-list?mode=off" ground="black">
                Switch the preview off
              </TextLink>
            </>
          ) : (
            <PrimaryLink href="/api/shot-list?mode=on">Show placeholders on the site</PrimaryLink>
          )}
        </div>
      </PageHero>

      <Rail ground="white" title="Art direction">
        <ol>
          {ART_DIRECTION.map((line, index) => (
            <li key={line} className="border-t border-brand-gray-muted/30 py-5 first:border-t-0 first:pt-0">
              <Reveal index={index % 2}>
                <p className="text-[1.05rem] leading-[1.7] text-brand-black">{line}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Rail>

      {GROUPS.map((group, index) => (
        <Rail key={group.title} ground={index % 2 === 0 ? "bone" : "white"} title={`${group.title} · ${group.shots.length}`}>
          <Rows
            ground={index % 2 === 0 ? "bone" : "white"}
            items={group.shots.map((item) => ({
              key: item.title,
              title: item.title,
              detail: item.direction,
              meta: `${item.format} · ${item.where}`,
              href: item.href,
            }))}
          />
        </Rail>
      ))}

      <Section ground="black">
        <p className="max-w-2xl text-[1rem] leading-[1.8] text-brand-gray-muted">
          Before-and-after photographs are not part of this shoot. They are clinical photographs,
          taken in the clinic under consistent conditions, and appear on the Results page only with
          the patient&apos;s written consent.
        </p>
      </Section>
    </main>
  );
}
