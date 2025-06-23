import {
  AccueilConnectePresenter,
  AccueilConnecteViewModel,
} from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';
import { Raccourcis } from '@/domaines/thematiques/Raccourcis';

export class AccueilConnectePresenterImpl implements AccueilConnectePresenter {
  constructor(private readonly accueilConnecteViewModel: (viewModel: AccueilConnecteViewModel) => void) {}

  presente(accueilConnecte: AccueilConnecte): void {
    this.accueilConnecteViewModel({
      commune: accueilConnecte.commune,
      progression: {
        nombreActionsTerminees: accueilConnecte.totalActionsUtilisateurFaites,
        pourcentageCompletionBilan: accueilConnecte.pourcentageCompletionBilan,
        tonneBilan: Math.round(accueilConnecte.bilanCarboneTotalKg / 1000),
      },
      raccourcis: [
        Raccourcis.serviceProximite,
        Raccourcis.aides(accueilConnecte.nombreAides),
        Raccourcis.simulateurMesAidesVelo,
        Raccourcis.actionMesAidesReno,
        Raccourcis.serviceRecettes(accueilConnecte.nombreRecettes),
        Raccourcis.actionSimulateurVoiture,
        Raccourcis.serviceFruitsEtLegumes,
        Raccourcis.serviceLongueVieAuxObjets,
      ],
      totalActionsRealisees: accueilConnecte.totalActionsNationalesFaites,
    });
  }
}
