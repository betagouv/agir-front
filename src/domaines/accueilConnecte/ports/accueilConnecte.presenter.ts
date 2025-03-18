import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';

type ProgressionViewModel = {
  nombreActionsTerminees: number;
  pourcentageCompletionBilan: number;
};

type RaccourcisViewModel = {
  label: string;
  emoji: string;
  lien: string;
};

export interface AccueilConnecteViewModel {
  commune: string;
  progression: ProgressionViewModel;
  raccourcis: RaccourcisViewModel[];
  totalActionsRealisees: number;
}

export interface AccueilConnectePresenter {
  presente(accueilConnecte: AccueilConnecte): void;
}
