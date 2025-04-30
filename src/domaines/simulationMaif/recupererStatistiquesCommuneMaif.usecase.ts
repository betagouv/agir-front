import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaifPresenter } from '@/domaines/simulationMaif/ports/statistiquesCommuneMaif.presenter';

export type StatistiquesCommuneMaif = {
  commune: string;
  nombreArretsCatnat: number;
  pourcentageSurfaceSecheresseGeotech: number;
  pourcentageSurfaceInondation: number;
};

export class RecupererStatistiquesCommuneMaifUsecase {
  constructor(private readonly simulationMaifRepository: SimulateurMaifRepository) {}

  async execute(
    utilisateurId: string,
    statistiquesCommuneMaifPresenter: StatistiquesCommuneMaifPresenter,
  ): Promise<void> {
    const statistiquesCommune = await this.simulationMaifRepository.recupererStatistiquesCommune(utilisateurId);
    statistiquesCommuneMaifPresenter.presente(statistiquesCommune);
  }
}
