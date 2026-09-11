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
  others?: Ref[];
};

export type ApproachSummary = Ref & {
  summary?: string;
  concerns?: Ref[];
};

export type Approach = Ref & {
  summary?: string;
  philosophy?: string;
  considerations?: string[];
  image?: SanityImage | null;
  modalities?: { _id: string; name: string; description?: string }[];
  concerns?: (Ref & { summary?: string })[];
  technologies?: TechnologyRef[];
  programmes?: ProgrammeRef[];
};

export type ProgrammeSummary = ProgrammeRef & { shortTitle?: string };

export type Programme = ProgrammeSummary & {
  body?: string;
  closing?: string;
  image?: SanityImage | null;
};

export type TechnologyItem = TechnologyRef & {
  categories?: string[];
};

export type Machine = TechnologyItem & {
  description?: string;
  image?: SanityImage | null;
  approaches?: Ref[];
  concerns?: (Ref & { summary?: string })[];
};

export type Doctor = {
  _id: string;
  name: string;
  slug: string;
  position?: string;
  role?: string;
  specialty?: string;
  shortBio?: string;
  biography?: string;
  quote?: string;
  practisingSince?: number;
  qualifications?: string[];
  expertise?: string[];
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
  publishedAt: string;
  image?: SanityImage | null;
  concern?: { title: string; slug: string } | null;
  doctor?: { name: string } | null;
};

export type Article = ArticleSummary & {
  body?: PortableTextBlock[];
  _updatedAt: string;
  others?: { _id: string; title: string; excerpt?: string; slug: string }[];
};

export type SiteSettings = {
  heroImage?: SanityImage | null;
  philosophyImage?: SanityImage | null;
  clinicImage?: SanityImage | null;
  consultationImage?: SanityImage | null;
};
