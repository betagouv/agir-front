export interface Thematique {
  titre: string;
  id: string;
  progression: {
    etapeActuelle: number;
    etapeCible: number;
  };
  estBloquee: boolean;
  raisonDuBlocage: string;
  estNouvelle: boolean;
  niveau: number;
  urlImage: string;
  thematiqueParent: {
    clefAPI: string;
    label: string;
  };
}
