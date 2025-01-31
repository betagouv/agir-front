import { DonneesCollectivitesCP } from '@/domaines/collectivites/recupererDonneesCollectivitesCodePostal.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface DonneesCollectivitesCPViewModel {
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

export interface ViewModelWithUrl {
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

export interface DonneesCollectivitesCPPresenter {
  afficherDonneesCodePostal(donneesCollectivites: DonneesCollectivitesCP, codePostal: string): void;
}
