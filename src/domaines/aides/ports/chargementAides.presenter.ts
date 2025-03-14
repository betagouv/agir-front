import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';
import { Aides } from '@/domaines/aides/chargementAides.usecase';
import { TagStyle } from '@/domaines/thematiques/TagThematique';

export interface AideViewModel {
  id: string;
  titre: string;
  contenu: string;
  isSimulateur: boolean;
  url: string;
  montantMaximum?: string;
  thematiqueLabel: string;
  thematiqueTag: { label: string; style: TagStyle };
  urlCommencerVotreDemarche?: string;
  estGratuit: boolean;
  partenaire?: {
    logoUrl: string;
    accessibilite: string;
  };
}

export interface AidesViewModel {
  [key: AideViewModel['thematiqueLabel']]: ActionAideViewModel[];
}

export interface AidesAvecCouvertureViewModel {
  utilisateurEstCouvert: boolean;
  aides: AidesViewModel;
}

export interface ChargementAidesPresenter {
  presente(aides: Aides): void;
}
