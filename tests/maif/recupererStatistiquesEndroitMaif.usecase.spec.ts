import {
  RecupererStatistiquesEndroitMaifUsecase,
  StatistiquesEndroitMaif,
} from '@/domaines/simulationMaif/recupererStatistiquesEndroitMaif.usecase';
import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommunesMaifPresenterImpl } from '@/domaines/simulationMaif/adapters/statistiquesCommuneMaif.presenter.impl';

class SimulateurMaifRepositoryMock implements SimulateurMaifRepository {
  constructor(private readonly statistiques: StatistiquesEndroitMaif) {}

  async recupererStatistiquesEndroit(_utilisateurId: string, _codeEPCI: string): Promise<StatistiquesEndroitMaif> {
    return this.statistiques;
  }

  async recupererStatistiquesCommuneEtAdresse(): Promise<any> {
    return { risques: [] };
  }

  async recupererResultats(): Promise<any> {
    return { risques: [] };
  }
}

describe("Fichier de tests concernant la récupération des statistiques MAIF d'un endroit", () => {
  it("Devrait récupérer et présenter les statistiques de l'endroit", async () => {
    // GIVEN
    const commune = 'Paris';

    const statistiquesAttendues: StatistiquesEndroitMaif = {
      nombreArretsCatnat: 8,
      pourcentageSurfaceSecheresseGeotech: 18.7,
      pourcentageSurfaceInondation: 22.4,
    };

    const simulateurMaifRepository = new SimulateurMaifRepositoryMock(statistiquesAttendues);

    // WHEN - THEN
    const statistiquesCommuneMaifPresenter = new StatistiquesCommunesMaifPresenterImpl(viewModel => {
      expect(viewModel).toStrictEqual({
        chiffresCles: [
          {
            label: "<span class='text--bold display-block'>arrêtés CATNAT</span> depuis 1982",
            valeur: '8',
          },
          {
            illustration: '/maif/argiles.svg',
            label: "de la surface exposée <span class='text--bold display-block'>à la sécheresse géotechnique</span>",
            valeur: '18.7 %',
          },
          {
            illustration: '/maif/inondations.svg',
            label: "de la surface exposée <span class='text--bold display-block'>à l’inondation</span>",
            valeur: '22.4 %',
          },
        ],
        commune: 'Paris',
      });
    });

    const usecase = new RecupererStatistiquesEndroitMaifUsecase(simulateurMaifRepository);
    await usecase.execute('id-utilisateur', commune, '75036', statistiquesCommuneMaifPresenter);
  });
});
