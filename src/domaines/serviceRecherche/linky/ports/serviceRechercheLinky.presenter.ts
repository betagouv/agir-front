import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';

export interface ServiceRechercheLinkyPresenter {
  presente(informationCompteur: InformationCompteur): void;
}
