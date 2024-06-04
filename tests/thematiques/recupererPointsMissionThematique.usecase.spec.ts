import { ThematiqueRepositoryFake } from './adapters/recupererMissionThematique.repository.fake';
import { RecupererPointsMissionThematiqueUsecase } from '@/domaines/thematiques/recupererPointsMissionThematique.usecase';
import { PublierEvenementRepositorySpy } from '../shell/publierEvenement.repository.spy';
import { ThematiqueRepositorySpy } from './adapters/recupererMissionThematique.repository.spy';
import { SpyThematiqueEventBus } from './adapters/spyThematiqueEventBus';
import { ThematiqueEvent } from '@/domaines/thematiques/thematiqueEventBusImpl';

describe("Fichier de tests concernant la récupérations des points d'un objectif terminé d'une mission pour une thematique", () => {
  it("doit appeler le repository l'id de l'objectif et l'id de l'utiliser, et dois publier un evenement", async () => {
    // GIVEN
    const spyThematiqueEventBus = new SpyThematiqueEventBus();
    const thematiqueRepositorySpy = new ThematiqueRepositorySpy();
    // WHEN
    const usecase = new RecupererPointsMissionThematiqueUsecase(thematiqueRepositorySpy, spyThematiqueEventBus);
    await usecase.execute('utilisateurId', 'elementId');
    // THEN
    expect(thematiqueRepositorySpy.recupererPointsArgs).toEqual({
      idUtilisateur: 'utilisateurId',
      elementId: 'elementId',
    });
    expect(spyThematiqueEventBus.eventName).toBe(ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE);
  });
});
