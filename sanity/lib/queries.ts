import { defineQuery } from "next-sanity";

export const technologyPillarsQuery = defineQuery(`
  *[_type == "technologyPillar"] | order(title asc) {
    _id,
    title,
    description,
    "machines": machines[]->{ _id, name, description }
  }
`);
