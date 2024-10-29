import { TerminerMissionThematiqueUsecase } from '@/domaines/thematiques/terminerMissionThematique.usecase';
import { TerminerMissionThematiqueRepositorySpy } from './adapters/terminerMissionThematique.repository.spy';

describe('Fichier de tests concernant le fait de terminer une mission dans une thematique', () => {
  it("Nous devons prevenir le back-end lorsqu'une mission est terminée", async () => {
    // GIVEN
    const spyTerminerMissionThematiqueRepositorySpy = new TerminerMissionThematiqueRepositorySpy();
    // WHEN
    const usecase = new TerminerMissionThematiqueUsecase(spyTerminerMissionThematiqueRepositorySpy);
    await usecase.execute('thematiqueId', 'utilisateurId');
    // THEN
    expect(spyTerminerMissionThematiqueRepositorySpy.terminerMissionAEteAppele).toBe(true);
  });
});
