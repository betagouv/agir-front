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
          estBloquee: false,
          raisonDuBlocage: '',
          estNouvelle: true,
          niveau: 0,
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
          estBloquee: true,
          raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
          estNouvelle: true,
          niveau: 0,
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
          blocage: undefined,
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematiqueParent1',
          tagThematique: undefined,
        },
        {
          titre: 'Thematique 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          blocage: {
            raison: 'Depensez 1000 points pour débloquer cette thématique',
          },
          estNouvelle: true,
          niveau: 0,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'thematiqueParent2',
          tagThematique: undefined,
        },
      ]);
    }
  });
});
