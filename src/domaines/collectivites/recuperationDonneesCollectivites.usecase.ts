import { DonneesCollectivitesPresenter } from '@/domaines/collectivites/ports/donneesCollectivites.presenter';
import { DonneesCollectivitesRepository } from '@/domaines/collectivites/ports/donneesCollectivites.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface DonneesCollectivites {
  listeCommunes: string[];
  nombreInscrits: number;
  nombrePointsMoyen: number;
  nombreDefiEnCours: number;
  nombreDefiRealises: number;
  nombreArticlesLocaux: number;
  nombreArticlesTotal: number;
  aides: {
    nombreAidesTotal: number;
    nombreAidesNatTotal: number;
    nombreAidesRegionTotal: number;
    nombreAidesDepartementTotal: number;
    nombreAidesCommuneTotal: number;
  };
  thematiques: {
    nombre_aides_alimentation: number;
    nombre_aides_consommation: number;
    nombre_aides_logement: number;
    nombre_aides_transport: number;
    nombre_aides_dechet: number;
    nombre_aides_loisir: number;
  };
  longueVieAuxObjets: {
    tout: number;
    donner: number;
    reparer: number;
    louer: number;
    emprunter: number;
  };
  presDeChezNous: {
    circuitCourt: number;
    epicerieSuperette: number;
    marcheLocal: number;
    zeroDechet: number;
  };
  articles: {
    id: number;
    thematique: ClefThematiqueAPI;
    titre: string;
  }[];
  aidesLocales: {
    id: number;
    thematiques: ClefThematiqueAPI[];
    titre: string;
  }[];
}

export class RecuperationDonneesCollectivitesUsecase {
  constructor(private readonly donneesCollectivitesRepository: DonneesCollectivitesRepository) {}

  async execute(codePostal: string, presenter: DonneesCollectivitesPresenter): Promise<void> {
    const donneesCollectivites = await this.donneesCollectivitesRepository.recupererDonneesCodePostal(codePostal);
    presenter.afficherDonneesCodePostal(donneesCollectivites, codePostal);
  }
}
