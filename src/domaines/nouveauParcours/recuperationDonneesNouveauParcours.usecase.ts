import { NouveauParcoursPresenter } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
import { NouveauParcoursRepository } from '@/domaines/nouveauParcours/ports/nouveauParcours.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface NouveauParcours {
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

export class RecuperationDonneesNouveauParcoursUsecase {
  constructor(private readonly nouveauParcoursRepository: NouveauParcoursRepository) {}

  async execute(codePostal: string, presenter: NouveauParcoursPresenter): Promise<void> {
    const nouveauParcours = await this.nouveauParcoursRepository.getNouveauParcours(codePostal);
    presenter.displayNouveauParcours(nouveauParcours, codePostal);
  }
}
