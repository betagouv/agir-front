import {
  DonneesCollectivitesInseePresenter,
  DonneesCollectivitesInseeViewModel,
} from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';

export class DonneesCollectivitesInseePresenterImpl implements DonneesCollectivitesInseePresenter {
  constructor(
    private readonly viewModel: (donneesCollectivitesViewModel: DonneesCollectivitesInseeViewModel) => void,
  ) {}

  // TODO
  afficherDonneesInsee(donneesCollectivites: DonneesCollectivitesINSEE, insee: string) {
    this.viewModel({
      nomDuLieu: donneesCollectivites.nomDuLieu,
      departement: donneesCollectivites.departement,
      region: donneesCollectivites.region,
      listeCommunesPourEPCI: donneesCollectivites.estEPCI ? donneesCollectivites.listeCommunesPourEPCI : undefined,

      aides: {
        nationales: donneesCollectivites.aides.nationales,
        regionales: donneesCollectivites.aides.regionales,
        departementales: donneesCollectivites.aides.departementales,
        locales: donneesCollectivites.aides.locales,
      },
      articles: {
        departementales: donneesCollectivites.articles.departementales,
        locales: donneesCollectivites.articles.locales,
        regionales: donneesCollectivites.articles.regionales,
      },
      nombreDeDefi: {
        enCours: donneesCollectivites.nombreDefisEnCours,
        realises: donneesCollectivites.nombreDefisRealises,
      },
      nombreInscrits: {
        total: donneesCollectivites.nombreInscrits,
        local: donneesCollectivites.nombreInscritsLocaux,
      },
    });
  }
}
