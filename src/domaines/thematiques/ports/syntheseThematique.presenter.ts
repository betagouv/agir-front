import { SyntheseThematiques } from '@/domaines/thematiques/ports/thematique.repository';

export interface SyntheseThematiquePresenter {
  presente(synthese: SyntheseThematiques): Promise<void>;
}
