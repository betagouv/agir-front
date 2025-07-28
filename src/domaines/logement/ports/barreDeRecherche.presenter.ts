import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';

export interface BarreDeRecherchePresenter {
  presente(adresse: Adresse): void;
}
