import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
import { MissionsRepositoryMock } from './adapters/missions.repository.mock';
import { RecupererMissionsRecommandeesUsecase } from '@/domaines/missions/recupererMissionsRecommandees.usecase';
import { MissionsRecommandeesPresenterImpl } from '@/domaines/missions/adapters/missionsRecommandees.presenter.impl';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe('Fichier de tests concernant la récupération des missions recommandées', () => {
  it("En donnant l'id utilisateur, il doit récupérer ses missions recommandées", async () => {
    // GIVEN
    const usecase = new RecupererMissionsRecommandeesUsecase(
      new MissionsRepositoryMock([
        {
          titre: 'Thematique 1',
          id: '1',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefThematiqueAPI.alimentation,
            label: 'Nom de thematique parent 1',
          },
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefThematiqueAPI.transports,
            label: 'Nom de thematique parent 2',
          },
        },
        {
          titre: 'Thematique 3',
          id: '3',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefThematiqueAPI.consommation,
            label: 'Nom de thematique parent 3',
          },
        },
        {
          titre: 'Thematique 4',
          id: '4',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefThematiqueAPI.logement,
            label: 'Nom de thematique parent 4',
          },
        },
        {
          titre: 'Thematique 5',
          id: '5',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: 'thematique_inconnue',
            label: 'Nom de thematique parent 5',
          },
        },
      ]),
    );
    // WHEN
    await usecase.execute('1', new MissionsRecommandeesPresenterImpl(expectation));
    // THEN
    function expectation(thematiques) {
      expect(thematiques).toEqual<MissionViewModel[]>([
        {
          titre: 'Thematique 1',
          id: '1',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: ClefThematiqueAPI.alimentation,
          tagThematique: {
            label: 'Nom de thematique parent 1',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🥗',
            },
          },
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: ClefThematiqueAPI.transports,
          tagThematique: {
            label: 'Nom de thematique parent 2',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚗',
            },
          },
        },
        {
          titre: 'Thematique 3',
          id: '3',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: ClefThematiqueAPI.consommation,
          tagThematique: {
            label: 'Nom de thematique parent 3',
            style: {
              backgroundColor: '#FFE8D7',
              color: '#522E02',
              emoji: '👕',
            },
          },
        },
        {
          titre: 'Thematique 4',
          id: '4',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: ClefThematiqueAPI.logement,
          tagThematique: {
            label: 'Nom de thematique parent 4',
            style: {
              backgroundColor: '#FFE2E0',
              color: '#52022E',
              emoji: '🏠',
            },
          },
        },
        {
          titre: 'Thematique 5',
          id: '5',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematique_inconnue',
          tagThematique: {
            label: 'Nom de thematique parent 5',
            style: {
              backgroundColor: '#ececec',
              color: 'black',
              emoji: '👏',
            },
          },
        },
      ]);
    }
  });
});
