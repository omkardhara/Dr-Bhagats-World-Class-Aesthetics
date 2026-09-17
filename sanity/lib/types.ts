import type { SanityImage } from "./image";

/** Minimal Portable Text shape; the renderer validates the rest. */
export type PortableTextBlock = { _type: string; _key: string; [field: string]: unknown };

type Ref = { _id: string; title: string; slug: string };

export type TechnologyRef = {
  _id: string;
  name: string;
  slug: string;
  purpose?: string;
  dedicatedPage?: boolean | null;
};

export type ProgrammeRef = Ref & { tagline?: string };

export type ConcernSummary = Ref & {
  summary?: string;
  relatedConditions?: string[];
};

export type Concern = ConcernSummary & {
  understanding?: string;
  assessment?: string;
  approach?: string;
  resultCategory?: string;
  image?: SanityImage | null;
  faqs?: { question: string; answer: string }[];
  programmes?: ProgrammeRef[];
  approaches?: (Ref & { summary?: string })[];
  technologies?: TechnologyRef[];
  articles?: ArticleSummary[];
  others?: Ref[];
};

export type ApproachSummary = Ref & {
  summary?: string;
  concerns?: Ref[];
};

export type Approach = Ref & {
  summary?: string;
  philosophy?: string;
  addresses?: string[];
  considerations?: string[];
  expectations?: string;
  downtime?: string;
  combinations?: string;
  image?: SanityImage | null;
  modalities?: { _id: string; name: string; description?: string }[];
  concerns?: (Ref & { summary?: string })[];
  technologies?: TechnologyRef[];
  programmes?: ProgrammeRef[];
  articles?: ArticleSummary[];
};

export type ProgrammeSummary = ProgrammeRef & { shortTitle?: string };

export type Programme = ProgrammeSummary & {
  body?: string;
  closing?: string;
  forWhom?: string;
  assessed?: string[];
  sequence?: { _key: string; title: string; description?: string }[];
  whyProgramme?: string;
  objective?: string;
  image?: SanityImage | null;
};

export type TechnologyItem = TechnologyRef & {
  categories?: string[];
};

export type Machine = TechnologyItem & {
  description?: string;
  whatItIs?: string;
  helpsWith?: string[];
  whoMayBenefit?: string;
  whatItInvolves?: string;
  downtime?: string;
  whereItFits?: string;
  image?: SanityImage | null;
  approaches?: Ref[];
  concerns?: (Ref & { summary?: string })[];
};

/** One line of the academic record on the About page. */
export type Foundation = { _key?: string; title: string; detail?: string };

export type Doctor = {
  _id: string;
  name: string;
  slug: string;
  degree?: string;
  institution?: string;
  credential?: string;
  position?: string;
  role?: string;
  specialty?: string;
  shortBio?: string;
  biography?: string;
  quote?: string;
  practisingSince?: number;
  expertise?: string[];
  foundations?: Foundation[];
  qualifications?: string[];
  conferences?: string[];
  publications?: string[];
  achievements?: string[];
  memberships?: string[];
  technologies?: TechnologyRef[];
  portrait?: SanityImage | null;
};

export type Testimonial = {
  _id: string;
  author: string;
  quote: string;
  category?: string | null;
};

export type Result = {
  _id: string;
  category: string;
  summary?: string;
  before: SanityImage;
  after: SanityImage;
  concern?: { title: string; slug: string } | null;
  technologies?: { name: string; slug: string }[];
};

export type ClinicSpace = {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  images: SanityImage[];
};

export type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  portrait?: SanityImage | null;
};

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  featured?: boolean;
  publishedAt: string;
  image?: SanityImage | null;
  concern?: { title: string; slug: string } | null;
  doctor?: { name: string } | null;
};

export type Article = Omit<ArticleSummary, "concern"> & {
  body?: PortableTextBlock[];
  _updatedAt: string;
  /** The article page also reads the concern's summary, to introduce it. */
  concern?: { title: string; slug: string; summary?: string } | null;
  approach?: { title: string; slug: string; summary?: string } | null;
  others?: ArticleSummary[];
};

export type SiteSettings = {
  heroImage?: SanityImage | null;
  philosophyImage?: SanityImage | null;
  doctorsImage?: SanityImage | null;
  clinicImage?: SanityImage | null;
  consultationImage?: SanityImage | null;
};
