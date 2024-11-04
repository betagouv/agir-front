import { RecupererPointsMissionUsecase } from '@/domaines/missions/recupererPointsMission.usecase';
import { MissionRepositorySpy } from './adapters/recupererPointMissionThematique.repository.spy';
import { SpyMissionEventBus } from './adapters/spyMissionEventBus';
import { MissionEvent } from '@/domaines/missions/missionEventBus.impl';

describe("Fichier de tests concernant la récupérations des points d'un objectif terminé d'une mission", () => {
  it("doit appeler le repository l'id de l'objectif et l'id de l'utiliser, et dois publier un evenement", async () => {
    // GIVEN
    const spyMissionEventBus = new SpyMissionEventBus();
    const missionRepositorySpy = new MissionRepositorySpy();
    // WHEN
    const usecase = new RecupererPointsMissionUsecase(missionRepositorySpy, spyMissionEventBus);
    await usecase.execute('utilisateurId', 'elementId');
    // THEN
    expect(missionRepositorySpy.recupererPointsArgs).toEqual({
      idUtilisateur: 'utilisateurId',
      elementId: 'elementId',
    });
    expect(spyMissionEventBus.eventName).toBe(MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE);
  });
});
