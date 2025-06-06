import { SyntheseThematiques } from '@/domaines/thematiques/ports/thematiques.repository';

export interface SyntheseThematiqueViewModel {
  id: string;
  titreHTML: string;
  bulletPoints: string[];
}

export interface SyntheseThematiquesViewModel {
  commune: string;
  cartesThematiques: SyntheseThematiqueViewModel[];
}

export interface SyntheseThematiquePresenter {
  presente(synthese: SyntheseThematiques): Promise<void>;
}
