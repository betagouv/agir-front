import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

export interface NouveauParcoursViewModel {
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
    lien: string;
    articles: {
      id: number;
      titre: string;
    }[];
  }[];
}

export interface NouveauParcoursPresenter {
  displayNouveauParcours(nouveauParcours: NouveauParcours): void;
}
