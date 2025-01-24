import { Collectivites } from '@/domaines/communes/ports/communeRepository';

export interface RechercheDeCollectiviteViewModel {
  listeDeCollectivites: Collectivites;
  message: string;
}

export interface ChercherCollectivitesPresenter {
  presente(communes: Collectivites): void;
}
