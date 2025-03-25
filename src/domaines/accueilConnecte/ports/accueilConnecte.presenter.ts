import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';
import { RaccourciViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

type ProgressionViewModel = {
  nombreActionsTerminees: number;
  pourcentageCompletionBilan: number;
};

export interface AccueilConnecteViewModel {
  commune: string;
  progression: ProgressionViewModel;
  raccourcis: RaccourciViewModel[];
  totalActionsRealisees: number;
}

export interface AccueilConnectePresenter {
  presente(accueilConnecte: AccueilConnecte): void;
}
