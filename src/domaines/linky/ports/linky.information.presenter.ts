import { InformationCompteur } from '@/domaines/linky/obtenirInformationCompteur.usecase';

export interface InformationCompteurViewModel {
  prm: string;
  estConfigure: boolean;
  estActif: boolean;
  estFonctionnel: boolean;
  doitOuvrirLaModaleDeConfiguration: boolean;
}

export interface LinkyInformationPresenter {
  presente(informationCompteur: InformationCompteur): void;
}
