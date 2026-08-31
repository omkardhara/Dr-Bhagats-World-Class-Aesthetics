import { defineQuery } from "next-sanity";

export const technologyPillarsQuery = defineQuery(`
  *[_type == "technologyPillar"] | order(title asc) {
    _id,
    title,
    description,
    "machines": machines[]->{ _id, name, description }
  }
`);

export const coreServicesQuery = defineQuery(`
  *[_type == "coreService"] | order(title asc) {
    _id,
    title,
    "treatments": treatments[]->{
      _id,
      name,
      description,
      "machines": machines[]->{ _id, name }
    }
  }
`);
