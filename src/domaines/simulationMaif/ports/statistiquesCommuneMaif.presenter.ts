import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaif.usecase';

export interface StatistiquesCommuneMaifPresenter {
  presente(statistiquesCommuneMaif: StatistiquesCommuneMaif): void;
}
