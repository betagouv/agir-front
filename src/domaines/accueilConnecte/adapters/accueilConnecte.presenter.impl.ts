import {
  AccueilConnectePresenter,
  AccueilConnecteViewModel,
} from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';
import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
import { Raccourcis } from '@/domaines/thematiques/Raccourcis';

export class AccueilConnectePresenterImpl implements AccueilConnectePresenter {
  constructor(private readonly accueilConnecteViewModel: (viewModel: AccueilConnecteViewModel) => void) {}

  presente(accueilConnecte: AccueilConnecte): void {
    this.accueilConnecteViewModel({
      commune: accueilConnecte.commune,
      progression: {
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
      completionGlobaleRecommandations: accueilConnecte.pourcentageGlobalRecommandations,
      thematiquesEtCompletion: this.identifierThematiquesACompleter(accueilConnecte),
    });
  }

  private identifierThematiquesACompleter(accueilConnecte: AccueilConnecte): (Thematique & { estComplete: boolean })[] {
    const progressionParThematique = {
      [ClefThematiqueAPI.alimentation]: accueilConnecte.pourcentageAlimentationRecommandations,
      [ClefThematiqueAPI.logement]: accueilConnecte.pourcentageLogementRecommandations,
      [ClefThematiqueAPI.transports]: accueilConnecte.pourcentageTransportRecommandations,
      [ClefThematiqueAPI.consommation]: accueilConnecte.pourcentageConsommationRecommandations,
    };

    return Object.entries(progressionParThematique).map(([clef, pourcentage]) => ({
      ...MenuThematiques.getThematiqueData(clef as ClefThematiqueAPI),
      estComplete: pourcentage >= 100,
    }));
  }
}
