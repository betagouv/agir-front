import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';
import { Thematique } from '@/domaines/thematiques/MenuThematiques';
import { RaccourciViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

type ProgressionViewModel = {
  pourcentageCompletionBilan: number;
  tonneBilan: number;
};

export interface AccueilConnecteViewModel {
  commune: string;
  progression: ProgressionViewModel;
  raccourcis: RaccourciViewModel[];
  completionGlobaleRecommandations: number;
  thematiquesEtCompletion: (Thematique & { estComplete: boolean })[];
}

export interface AccueilConnectePresenter {
  presente(accueilConnecte: AccueilConnecte): void;
}
