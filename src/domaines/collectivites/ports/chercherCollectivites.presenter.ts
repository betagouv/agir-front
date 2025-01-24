import { Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

export interface RechercheDeCollectiviteViewModel {
  listeDeCollectivites: Collectivites;
  message: string;
}

export interface ChercherCollectivitesPresenter {
  presente(communes: Collectivites): void;
}
