import {
  AccueilConnectePresenter,
  AccueilConnecteViewModel,
} from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';

export class AccueilConnectePresenterImpl implements AccueilConnectePresenter {
  constructor(private readonly accueilConnecteViewModel: (viewModel: AccueilConnecteViewModel) => void) {}

  presente(accueilConnecte: AccueilConnecte): void {
    this.accueilConnecteViewModel({
      commune: accueilConnecte.commune,
      progression: {
        nombreActionsTerminees: 3,
        pourcentageCompletionBilan: 50,
      },
      raccourcis: [
        {
          label: 'Agir',
          emoji: '🚀',
          lien: '/v2/agir',
        },
      ],
      totalActionsRealisees: 6,
    });
  }
}
