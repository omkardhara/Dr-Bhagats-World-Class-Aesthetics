import { type SchemaTypeDefinition } from "sanity";

import { concern } from "./concern";
import { coreService } from "./coreService";
import { doctor } from "./doctor";
import { machine } from "./machine";
import { technologyPillar } from "./technologyPillar";
import { testimonial } from "./testimonial";
import { treatment } from "./treatment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    machine,
    technologyPillar,
    treatment,
    coreService,
    concern,
    doctor,
    testimonial,
  ],
};
