import { Collectivites } from '@/domaines/collectivites/entities/collectivites';

export interface RechercheDeCollectiviteViewModel {
  listeDeCollectivites: {
    codeInsee: string;
    nom: string;
  }[];
  message: string;
}

export interface ChercherCollectivitesPresenter {
  presente(communes: Collectivites, recherche: string): void;
}
