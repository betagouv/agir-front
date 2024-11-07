import { MissionsPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
import { RecupererMissionsThematiqueUsecase } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { MissionsRepositoryMock } from './adapters/missions.repository.mock';

describe('Fichier de tests concernant la récupération des missions pour une thématique', () => {
  it("En donnant l'id utilisateur et l'id de la thématique doit récupérer les missions", async () => {
    // GIVEN
    const usecase = new RecupererMissionsThematiqueUsecase(
      new MissionsRepositoryMock([
        {
          titre: 'Thematique 1',
          id: '1',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: 'thematiqueParent1',
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
            clefAPI: 'thematiqueParent2',
            label: 'Nom de thematique parent 2',
          },
        },
      ]),
    );
    // WHEN
    await usecase.execute('1', '1', new MissionsPresenterImpl(expectation));
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
          clefThematique: 'thematiqueParent1',
          tagThematique: undefined,
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematiqueParent2',
          tagThematique: undefined,
        },
      ]);
    }
  });
});
