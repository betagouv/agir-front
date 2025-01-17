import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface DonneesCollectivitesViewModel {
  codePostal: string;
  propositions: {
    emoji: string;
    titre: string;
    contenu: string[];
    nombreDAides: number;
    aides: AideLocaleViewModel[];
    lien: string;
    articles: ArticleLocalViewModel[];
  }[];
}

interface ViewModelWithUrl {
  url: {
    name: string;
    params: { id: number };
  };
}

export interface ArticleLocalViewModel extends ViewModelWithUrl {
  id: number;
  titre: string;
  thematique: string;
}

export interface AideLocaleViewModel extends ViewModelWithUrl {
  id: number;
  titre: string;
  thematiques: ClefThematiqueAPI[];
}

export interface DonneesCollectivitesPresenter {
  displayDonneesCollectivites(donneesCollectivites: DonneesCollectivites, codePostal: string): void;
}
