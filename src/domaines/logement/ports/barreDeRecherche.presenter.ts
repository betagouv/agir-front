import { AdresseDansLeCompte } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';

export interface BarreDeRecherchePresenter {
  presente(adresse: AdresseDansLeCompte): void;
}
