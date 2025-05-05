import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaifPresenter } from '@/domaines/simulationMaif/ports/statistiquesCommuneMaif.presenter';

export type StatistiquesEndroitMaif = {
  nombreArretsCatnat: number;
  pourcentageSurfaceSecheresseGeotech: number;
  pourcentageSurfaceInondation: number;
};

export class RecupererStatistiquesEndroitMaifUsecase {
  constructor(private readonly simulationMaifRepository: SimulateurMaifRepository) {}

  async execute(
    utilisateurId: string,
    commune: string,
    codeEPCI: string,
    statistiquesCommuneMaifPresenter: StatistiquesCommuneMaifPresenter,
  ): Promise<void> {
    const statistiquesCommune = await this.simulationMaifRepository.recupererStatistiquesEndroit(
      utilisateurId,
      codeEPCI,
    );
    statistiquesCommuneMaifPresenter.presente({ commune, ...statistiquesCommune });
  }
}
