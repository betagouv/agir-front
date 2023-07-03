type ImpactCarbonElement = {
  value: number;
  equivalent: string;
  nature: string;
  comment: string;
};

export type ImpactCarbonDuJour = {
  suiviDuJOur: string;
  details: {
    voiture: ImpactCarbonElement;
    metro: ImpactCarbonElement;
    bus: ImpactCarbonElement;
    train: ImpactCarbonElement;
    viandeRouge: ImpactCarbonElement;
    poisson: ImpactCarbonElement;
  };
};
