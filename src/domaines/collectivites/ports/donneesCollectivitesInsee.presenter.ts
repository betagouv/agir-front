import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface ArticleCollectiviteViewModel {
  id: number;
  thematiques: ClefThematiqueAPI[];
  titre: string;
}

interface AideCollectiviteViewModel {
  id: number;
  thematiques: ClefThematiqueAPI[];
  titre: string;
}

export interface DonneesCollectivitesInseeViewModel {
  nomDuLieu: string;
  departement: string;
  region: string;
  listeCommunesPourEPCI?: string[];

  aides: {
    nationales: AideCollectiviteViewModel[];
    regionales: AideCollectiviteViewModel[];
    departementales: AideCollectiviteViewModel[];
    locales: AideCollectiviteViewModel[];
  };
  articles: {
    regionales: ArticleCollectiviteViewModel[];
    departementales: ArticleCollectiviteViewModel[];
    locales: ArticleCollectiviteViewModel[];
  };
  nombreDeDefi: {
    enCours: number;
    realises: number;
  };
  nombreInscrits: {
    total: number;
    local: number;
  };
}

export interface DonneesCollectivitesInseePresenter {
  afficherDonneesInsee(donneesCollectivites: DonneesCollectivitesINSEE, insee: string): void;
}
