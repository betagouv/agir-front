import {
  NouveauParcoursPresenter,
  NouveauParcoursViewModel,
} from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

export class NouveauParcoursPresenterImpl implements NouveauParcoursPresenter {
  constructor(private readonly viewModel: (nouveauParcoursViewModel: NouveauParcoursViewModel) => void) {}

  displayNouveauParcours(nouveauParcours: NouveauParcours): void {
    this.viewModel({
      nombreInscrits: nouveauParcours.nombreInscrits,
      nombrePointsMoyen: nouveauParcours.nombrePointsMoyen,
      aides: {
        nombreAidesTotal: nouveauParcours.aides.nombreAidesTotal,
        nombreAidesNatTotal: nouveauParcours.aides.nombreAidesNatTotal,
        nombreAidesRegionTotal: nouveauParcours.aides.nombreAidesRegionTotal,
        nombreAidesDepartementTotal: nouveauParcours.aides.nombreAidesDepartementTotal,
        nombreAidesCommuneTotal: nouveauParcours.aides.nombreAidesCommuneTotal,
      },
      longueVieAuxObjets: {
        tout: nouveauParcours.longueVieAuxObjets.tout,
        donner: nouveauParcours.longueVieAuxObjets.donner,
        reparer: nouveauParcours.longueVieAuxObjets.reparer,
        louer: nouveauParcours.longueVieAuxObjets.louer,
        emprunter: nouveauParcours.longueVieAuxObjets.emprunter,
      },
      presDeChezNous: {
        circuitCourt: nouveauParcours.presDeChezNous.circuitCourt,
        epicerieSuperette: nouveauParcours.presDeChezNous.epicerieSuperette,
        marcheLocal: nouveauParcours.presDeChezNous.marcheLocal,
        zeroDechet: nouveauParcours.presDeChezNous.zeroDechet,
      },
    });
  }
}
