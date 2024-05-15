import { Aides } from '@/domaines/aides/chargementAides.usecase';

export interface AideViewModel {
  id: string;
  titre: string;
  categorie: string;
  contenu: string;
  isSimulateur: boolean;
  url: string;
  montantMaximum?: string;
}

export interface AidesViewModel {
  [key: AideViewModel['categorie']]: AideViewModel[];
}

export interface ChargementAidesPresenter {
  presente(aides: Aides[]): void;
}
