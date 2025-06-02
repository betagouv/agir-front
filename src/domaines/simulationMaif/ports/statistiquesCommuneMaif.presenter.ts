import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';

export interface StatistiquesCommuneMaifPresenter {
  presente(statistiquesCommuneMaif: StatistiquesCommuneMaif): void;
}
