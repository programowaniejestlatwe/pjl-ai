export type TEngine = {
  fuel: string;
  motors: string[];
};

export type TChassis = {
  name: string;
  engines: TEngine[];
};

export type TModelVersions = {
  name: string;
  chassis: TChassis[];
};

export type TBrandModel = {
  name: string;
  available: boolean;
  versions: TModelVersions[];
};
