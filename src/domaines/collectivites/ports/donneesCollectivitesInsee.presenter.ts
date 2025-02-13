import { AidesVeloDisponibles } from '@/domaines/aides/simulerAideVelo.usecase';
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

export interface ContenuSupplementaireCollectivitesViewModel {
  emoji: string;
  titre: string;
  liste: string[];
  thematiques: ClefThematiqueAPI[];
}

export interface CarteThematique {
  emoji: string;
  titre: string;
  articles: ArticleOuAideCollectiviteViewModel[];
  aides: ArticleOuAideCollectiviteViewModel[];
  contenusSupplementaires: ContenuSupplementaireCollectivitesViewModel[];
}

export interface DonneesCollectivitesInseeViewModel extends IndicationGeoArticleOuAideViewModel {
  indicationNombreUtilisateurs: string;
  indicationAidesEtArticles: string;

  cartesThematiques: CarteThematique[];

  nombreInscrits: {
    total: number;
    local: number;
  };
}

export interface DonneesCollectivitesInseePresenter {
  afficherDonneesInsee(donneesCollectivites: DonneesCollectivitesINSEE, aidesVelo: AidesVeloDisponibles): void;
}
