import { TerminerMissionThematiqueUsecase } from '@/domaines/thematiques/terminerMissionThematique.usecase';
import { TerminierMissionThematiqueRepositorySpy } from './adapters/terminerMissionThematique.repository.spy';

describe('Fichier de tests concernant le fait de terminer une mission dans une thematique', () => {
  it("Nous devons prevenir le back-end lorsqu'une mission est terminée", async () => {
    // GIVEN
    const spyTerminierMissionThematiqueRepositorySpy = new TerminierMissionThematiqueRepositorySpy();
    // WHEN
    const usecase = new TerminerMissionThematiqueUsecase(spyTerminierMissionThematiqueRepositorySpy);
    await usecase.execute('thematiqueId', 'utilisateurId');
    // THEN
    expect(spyTerminierMissionThematiqueRepositorySpy.terminerMissionAEteAppele).toBe(true);
  });
});
