import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';

export interface DonneesCollectivitesViewModel {
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
    nombreDAides: number;
    aides: {
      id: number;
      titre: string;
    }[];
    lien: string;
    articles: {
      id: number;
      titre: string;
    }[];
  }[];
}

export interface DonneesCollectivitesPresenter {
  displayDonneesCollectivites(donneesCollectivites: DonneesCollectivites, codePostal: string): void;
}
