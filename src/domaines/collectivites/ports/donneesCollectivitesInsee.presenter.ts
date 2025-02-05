import { ViewModelWithUrl } from '@/domaines/collectivites/ports/donneesCollectivitesCP.presenter';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface IndicationGeoArticleOuAideViewModel {
  nom: string;
  departement: string;
  region: string;
}

export interface ArticleOuAideCollectiviteViewModel extends ViewModelWithUrl {
  id: number;
  titre: string;
  thematiques: ClefThematiqueAPI[];
  indicationGeographique: string;
}

interface CarteThematique {
  emoji: string;
  titre: string;
  articles: ArticleOuAideCollectiviteViewModel[];
  aides: ArticleOuAideCollectiviteViewModel[];
}

export interface DonneesCollectivitesInseeViewModel extends IndicationGeoArticleOuAideViewModel {
  listeCommunesPourEPCI?: string;

  indicationNombreUtilisateurs: string;
  indicationAidesEtArticles: string;

  cartesThematiques: CarteThematique[];

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
  afficherDonneesInsee(donneesCollectivites: DonneesCollectivitesINSEE): void;
}
