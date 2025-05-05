import { CalculerResultatSimulationMaifUsecase } from '@/domaines/simulationMaif/calculerResultatSimulationMaif.usecase';
import {
  ResultatSimulationMaif,
  RisqueMaifImpact,
  SimulateurMaifRepository,
} from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { Coordonnees } from '@/shell/coordonneesType';
import { SimulateurMaifPresenterImpl } from '@/domaines/simulationMaif/adapters/simulateurMaif.presenter.impl';

class SimulateurMaifRepositoryMock implements SimulateurMaifRepository {
  constructor(private readonly resultat: ResultatSimulationMaif) {}

  async recupererResultats(_utilisateurId: string, _coordonnees: Coordonnees): Promise<ResultatSimulationMaif> {
    return this.resultat;
  }

  async recupererStatistiquesCommune(): Promise<any> {
    return { risques: [] };
  }

  async recupererStatistiquesEndroit(): Promise<any> {
    return { risques: [] };
  }
}

describe('Fichier de tests concernant le calcul du résultat de la simulation MAIF', () => {
  it('Devrait récupérer et présenter le résultat de la simulation', async () => {
    // GIVEN
    const coordonnees: Coordonnees = {
      latitude: 48.856614,
      longitude: 2.3522219,
    };

    const data: ResultatSimulationMaif = {
      risques: [
        {
          nom: 'Inondation',
          impact: RisqueMaifImpact.MOYEN,
        },
        {
          nom: 'Tempête',
          impact: RisqueMaifImpact.FAIBLE,
        },
      ],
    };
    const simulateurMaifRepository = new SimulateurMaifRepositoryMock(data);

    // WHEN - THEN
    const simulateurMaifPresenter = new SimulateurMaifPresenterImpl(vm => {
      expect(vm).toStrictEqual({
        lienKit: 'https://api.aux-alentours.1934.io/report/pdf/v2/_byLatLon?lat=48.856614&lon=2.3522219',
        risques: [
          {
            badge: {
              class: 'fr-badge--brown-cafe-creme',
              label: 'Moyen',
            },
            nom: 'Inondation',
          },
          {
            badge: {
              class: 'fr-badge--green-tilleul-verveine',
              label: 'Faible',
            },
            nom: 'Tempête',
          },
        ],
      });
    });

    const usecase = new CalculerResultatSimulationMaifUsecase(simulateurMaifRepository);
    await usecase.execute('id-utilisateur', coordonnees, simulateurMaifPresenter);
  });
});
