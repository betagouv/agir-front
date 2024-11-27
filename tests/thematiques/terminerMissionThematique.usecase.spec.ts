import { TerminerMissionUsecase } from '@/domaines/missions/terminerMission.usecase';
import { TerminerMissionThematiqueRepositorySpy } from '../missions/adapters/terminerMissionThematique.repository.spy';
import { SpyMissionEventBus } from '../missions/adapters/spyMissionEventBus';

describe('Fichier de tests concernant le fait de terminer une mission dans une thematique', () => {
  it("Nous devons prevenir le back-end lorsqu'une mission est terminée", async () => {
    // GIVEN
    const terminerMissionThematiqueRepositorySpy = new TerminerMissionThematiqueRepositorySpy();
    const spyMissionEventBusSpy = new SpyMissionEventBus();
    // WHEN
    const usecase = new TerminerMissionUsecase(terminerMissionThematiqueRepositorySpy, spyMissionEventBusSpy);
    await usecase.execute('thematiqueId', 'utilisateurId');
    // THEN
    expect(terminerMissionThematiqueRepositorySpy.terminerMissionAEteAppele).toBe(true);
  });
});
