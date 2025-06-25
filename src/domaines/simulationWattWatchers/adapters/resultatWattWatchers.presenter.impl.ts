export type ResultatWWViewModel = {
  totalConsommation: number;
  economieActuelle: number;
  economiePotentielle: number;
  nombreActions: number;

  detailConsommations: {
    color: string;
    emoji: string;
    id: string;
    label: string;
    value: number;
    pourcentage: string;
  }[];
};
