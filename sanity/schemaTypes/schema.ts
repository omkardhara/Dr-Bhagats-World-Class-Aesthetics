import { type SchemaTypeDefinition } from "sanity";

import { coreService } from "./coreService";
import { machine } from "./machine";
import { technologyPillar } from "./technologyPillar";
import { treatment } from "./treatment";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [machine, technologyPillar, treatment, coreService],
};
