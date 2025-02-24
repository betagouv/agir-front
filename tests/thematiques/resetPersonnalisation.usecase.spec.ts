import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepositorySpy } from './adapters/thematiques.repository.spy';
import { ResetPersonnalisationUsecase } from '@/domaines/thematiques/resetPersonnalisation.usecase';

describe('Fichier de test concernant le fait de recommencer le parcours de personnalisation par thématique', () => {
  it('Quand la personnalisation est reset, doit faire un appel au repository', async () => {
    // GIVEN
    const thematiquesRepositorySpy = new ThematiquesRepositorySpy();
    const usecase = new ResetPersonnalisationUsecase(thematiquesRepositorySpy);

    // WHEN
    await usecase.execute('idUtilisateur', ClefThematiqueAPI.transports);

    // THEN
    expect(thematiquesRepositorySpy.resetPersonnalisationArgs).toStrictEqual({
      idUtilisateur: 'idUtilisateur',
      clefThematiqueApi: 'transport',
    });
  });
});
