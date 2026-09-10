import { type SchemaTypeDefinition } from "sanity";

import { clinicSpace } from "./clinicSpace";
import { concern } from "./concern";
import { doctor } from "./doctor";
import { journalArticle } from "./journalArticle";
import { machine } from "./machine";
import { result } from "./result";
import { signatureProgramme } from "./signatureProgramme";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";
import { treatment } from "./treatment";
import { treatmentApproach } from "./treatmentApproach";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    concern,
    treatmentApproach,
    signatureProgramme,
    treatment,
    machine,
    doctor,
    result,
    testimonial,
    journalArticle,
    clinicSpace,
    teamMember,
    siteSettings,
  ],
};
