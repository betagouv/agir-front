import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaifPresenter } from '@/domaines/simulationMaif/ports/statistiquesCommuneMaif.presenter';
import { Coordonnees } from '@/shell/coordonneesType';

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
    coordonnees: Coordonnees,
    statistiquesCommuneMaifPresenter: StatistiquesCommuneMaifPresenter,
  ): Promise<void> {
    const statistiquesCommune = await this.simulationMaifRepository.recupererStatistiquesEndroit(
      utilisateurId,
      coordonnees,
    );
    statistiquesCommuneMaifPresenter.presente({ commune, ...statistiquesCommune });
  }
}
