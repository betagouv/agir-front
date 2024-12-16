import { MissionsPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
import { RecupererMissionsThematiqueUsecase } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { MissionsRepositoryMock } from './adapters/missions.repository.mock';
import { RouteExamenName } from '@/router/examen/routes';
import { RouteThematiquesName } from '@/router/thematiques/routes';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe('Fichier de tests concernant la récupération des missions pour une thématique', () => {
  it("En donnant l'id utilisateur et l'id de la thématique doit récupérer les missions", async () => {
    // GIVEN
    const usecase = new RecupererMissionsThematiqueUsecase(
      new MissionsRepositoryMock([
        {
          titre: 'Mission 1',
          id: '1',
          estUnExamen: true,
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefThematiqueAPI.alimentation,
            label: 'Nom de thematique parent 1',
          },
        },
        {
          titre: 'Mission 2',
          id: '2',
          estUnExamen: false,
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          thematiqueParent: {
            clefAPI: ClefThematiqueAPI.transports,
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
          titre: 'Mission 1',
          id: '1',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'alimentation',
          tagThematique: undefined,
          url: {
            routeName: RouteExamenName.EXAMEN,
            thematiqueId: 'me-nourrir',
          },
        },
        {
          titre: 'Mission 2',
          id: '2',
          progression: { etapeActuelle: 0, etapeCible: 4 },
          estNouvelle: true,
          urlImage: 'https://via.placeholder.com/150',
          estTerminee: false,
          clefThematique: 'transport',
          tagThematique: undefined,
          url: {
            routeName: RouteThematiquesName.MISSION,
            thematiqueId: 'me-deplacer',
          },
        },
      ]);
    }
  });
});
