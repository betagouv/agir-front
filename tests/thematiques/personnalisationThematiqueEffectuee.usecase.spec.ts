import { PersonnalisationThematiqueEffectueeUsecase } from '@/domaines/thematiques/personnalisationThematiqueEffectuee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepositorySpy } from './adapters/thematiques.repository.spy';

describe("Fichier de test concernant le fait d'avoir terminé la personnalisation d'une thematique", () => {
  it('Quand la personnalisation est terminée doit faire un appel au repository', async () => {
    // GIVEN
    const thematiquesRepositorySpy = new ThematiquesRepositorySpy();
    const usecase = new PersonnalisationThematiqueEffectueeUsecase(thematiquesRepositorySpy);

    // WHEN
    await usecase.execute('idUtilisateur', ClefThematiqueAPI.alimentation);

    // THEN
    expect(thematiquesRepositorySpy.terminerPersonnalisationArgs).toStrictEqual({
      idUtilisateur: 'idUtilisateur',
      clefThematiqueApi: 'alimentation',
    });
  });
});
