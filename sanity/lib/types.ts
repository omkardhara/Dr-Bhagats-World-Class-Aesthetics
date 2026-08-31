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
  treatments?: Treatment[];
};
