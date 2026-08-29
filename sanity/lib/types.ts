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
