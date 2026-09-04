import type { SanityImage } from "./image";

export type Machine = {
  _id: string;
  name: string;
  description?: string;
};

export type TechnologyPillar = {
  _id: string;
  title: string;
  description?: string;
  machines?: Machine[];
};

export type Treatment = {
  _id: string;
  name: string;
  description?: string;
  machines?: Machine[];
};

export type CoreService = {
  _id: string;
  title: string;
  treatments?: (Treatment & { slug?: string })[];
};

export type ConcernCategory = "skin" | "face" | "hair" | "body";

export type Concern = {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImage | null;
  category: ConcernCategory;
  summary?: string;
  description?: string;
  faqs?: { question: string; answer: string }[];
  treatments?: (Treatment & { slug?: string })[];
};

export type Doctor = {
  _id: string;
  name: string;
  slug: string;
  portrait?: SanityImage | null;
  role?: string;
  qualifications?: string[];
  bio?: string;
};

export type Testimonial = {
  _id: string;
  author: string;
  quote: string;
  date?: string;
  source?: string;
};

export type TreatmentDetail = Treatment & {
  slug: string;
  image?: SanityImage | null;
  service?: { _id: string; title: string; slug: string } | null;
  concerns?: { _id: string; title: string; category: ConcernCategory; slug: string }[];
};
