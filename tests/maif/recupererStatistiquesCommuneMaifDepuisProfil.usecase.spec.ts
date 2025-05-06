import {
  RecupererAdresseEtStatistiquesCommuneMaifUsecase,
  StatistiquesCommuneEtAdresse,
  StatistiquesCommuneMaif,
} from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
import { SimulateurMaifRepository } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommunesMaifPresenterImpl } from '@/domaines/simulationMaif/adapters/statistiquesCommuneMaif.presenter.impl';
import {
  BarreDeRecherchePresenterImpl,
  BarreDeRechercheViewModel,
} from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';

class SimulateurMaifRepositoryMock implements SimulateurMaifRepository {
  constructor(private readonly statistiques: StatistiquesCommuneEtAdresse) {}

  async recupererStatistiquesCommuneEtAdresse(_utilisateurId: string): Promise<StatistiquesCommuneEtAdresse> {
    return this.statistiques;
  }

  async recupererStatistiquesEndroit(): Promise<any> {
    return { risques: [] };
  }

  async recupererResultats(): Promise<any> {
    return { risques: [] };
  }
}

describe('Fichier de tests concernant la récupération des statistiques MAIF de la commune du profil', () => {
  it('Devrait récupérer et présenter les statistiques de la commune', async () => {
    // GIVEN
    const statistiquesAttendues: StatistiquesCommuneEtAdresse = {
      statistiquesCommune: {
        commune: 'Paris',
        nombreArretsCatnat: 12,
        pourcentageSurfaceSecheresseGeotech: 25.5,
        pourcentageSurfaceInondation: 15.3,
      },
      adresseDansLeCompte: {
        commune: 'PARIS',
        communeLabel: 'Paris',
        rue: "Avenue de l'Opéra",
        numeroRue: '34',
        codePostal: '75002',
        coordonnees: {
          latitude: 48.8606,
          longitude: 2.3376,
        },
      },
    };

    const simulateurMaifRepository = new SimulateurMaifRepositoryMock(statistiquesAttendues);

    // WHEN - THEN
    const statistiquesCommuneMaifPresenter = new StatistiquesCommunesMaifPresenterImpl(viewModel => {
      expect(viewModel).toStrictEqual({
        chiffresCles: [
          {
            label: "<span class='text--bold display-block'>arrêtés CATNAT</span> depuis 1982",
            valeur: '12',
          },
          {
            illustration: '/maif/argiles.svg',
            label: "de la surface exposée <span class='text--bold display-block'>à la sécheresse géotechnique</span>",
            valeur: '25.5 %',
          },
          {
            illustration: '/maif/inondations.svg',
            label: "de la surface exposée <span class='text--bold display-block'>à l’inondation</span>",
            valeur: '15.3 %',
          },
        ],
        commune: 'Paris',
      });
    });

    const barreDeRecherchePresenter = new BarreDeRecherchePresenterImpl((viewModel: BarreDeRechercheViewModel) => {
      expect(viewModel).toStrictEqual<BarreDeRechercheViewModel>({
        coordonnees: {
          latitude: 48.8606,
          longitude: 2.3376,
        },
        recherche: "34 Avenue de l'Opéra, Paris (75002)",
      });
    });

    const usecase = new RecupererAdresseEtStatistiquesCommuneMaifUsecase(simulateurMaifRepository);
    await usecase.execute('id-utilisateur', statistiquesCommuneMaifPresenter, barreDeRecherchePresenter);
  });
});
