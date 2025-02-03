import { DonneesCollectivitesRepository } from '@/domaines/collectivites/ports/donneesCollectivites.repository';
import { DonneesCollectivitesInseePresenter } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface AideOuArticleDeCollectivite {
  id: number;
  thematiques: ClefThematiqueAPI[];
  titre: string;
}

export interface DonneesCollectivitesINSEE {
  nom: string;
  departement: string;
  region: string;
  estEPCI: boolean;
  listeCommunesPourEPCI: string[];

  aides: {
    nationales: AideOuArticleDeCollectivite[];
    regionales: AideOuArticleDeCollectivite[];
    departementales: AideOuArticleDeCollectivite[];
    locales: AideOuArticleDeCollectivite[];
  };
  articles: {
    regionales: AideOuArticleDeCollectivite[];
    departementales: AideOuArticleDeCollectivite[];
    locales: AideOuArticleDeCollectivite[];
  };

  nombreInscrits: number;
  nombreInscritsLocaux: number;
  nombrePointsMoyen: number;
  nombreDefisEnCours: number;
  nombreDefisRealises: number;
}

export class RecupererDonneesCollectivitesInsee {
  constructor(private readonly donneesCollectivitesRepository: DonneesCollectivitesRepository) {}

  async execute(insee: string, presenter: DonneesCollectivitesInseePresenter): Promise<void> {
    const donneesCollectivites = await this.donneesCollectivitesRepository.recupererDonneesInsee(insee);
    presenter.afficherDonneesInsee(donneesCollectivites);
  }
}
