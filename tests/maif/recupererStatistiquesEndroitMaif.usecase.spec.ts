import {
  RecupererStatistiquesEndroitMaifUsecase,
  StatistiquesEndroitMaif,
} from '@/domaines/simulationMaif/recupererStatistiquesEndroitMaif.usecase';
import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommunesMaifPresenterImpl } from '@/domaines/simulationMaif/adapters/statistiquesCommuneMaif.presenter.impl';
import { Coordonnees } from '@/shell/coordonneesType';

class SimulateurMaifRepositoryMock implements SimulateurMaifRepository {
  constructor(private readonly statistiques: StatistiquesEndroitMaif) {}

  async recupererStatistiquesEndroit(
    _utilisateurId: string,
    _coordonnees: Coordonnees,
  ): Promise<StatistiquesEndroitMaif> {
    return this.statistiques;
  }

  async recupererStatistiquesCommune(): Promise<any> {
    return { risques: [] };
  }

  async recupererResultats(): Promise<any> {
    return { risques: [] };
  }
}

describe("Fichier de tests concernant la récupération des statistiques MAIF d'un endroit", () => {
  it("Devrait récupérer et présenter les statistiques de l'endroit", async () => {
    // GIVEN
    const coordonnees: Coordonnees = {
      latitude: 48.856614,
      longitude: 2.3522219,
    };

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
            label: "<span class='text--bold'>arrêtés CATNAT</span> depuis 1982",
            valeur: '8',
          },
          {
            label: "de la surface exposée <span class='text--bold'>à la sécheresse géotechnique</span>",
            valeur: '18.7 %',
          },
          {
            label: "de la surface exposée <span class='text--bold'>à l’inondation</span>",
            valeur: '22.4 %',
          },
        ],
        commune: 'Paris',
      });
    });

    const usecase = new RecupererStatistiquesEndroitMaifUsecase(simulateurMaifRepository);
    await usecase.execute('id-utilisateur', commune, coordonnees, statistiquesCommuneMaifPresenter);
  });
});
