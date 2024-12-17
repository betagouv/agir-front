import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

export interface NouveauParcoursViewModel {
  codePostal: string;
  nombreInscrits: number;
  nombrePointsMoyen: number;
  nombreArticlesLocaux: number;
  nombreArticlesTotal: number;
  nombreDefiEnCours: number;
  nombreDefiRealises: number;
  propositions: {
    emoji: string;
    titre: string;
    contenu: string[];
    aides: string[];
    lien: string;
    articles: {
      id: number;
      titre: string;
    }[];
  }[];
}

export interface NouveauParcoursPresenter {
  displayNouveauParcours(nouveauParcours: NouveauParcours, codePostal: string): void;
}
