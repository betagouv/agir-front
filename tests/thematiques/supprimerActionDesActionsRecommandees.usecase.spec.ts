import { ThematiquesRepositorySpy } from './adapters/thematiques.repository.spy';
import { SupprimerActionDesActionsRecommandeesUsecase } from '@/domaines/thematiques/supprimerActionDesActionsRecommandees.usecase';

describe('Fichier de test concernant le fait de supprimer une action parmis des actions recommandées', () => {
  it('Quand une carte est supprimée, doit faire un appel au repository', async () => {
    // GIVEN
    const thematiquesRepositorySpy = new ThematiquesRepositorySpy();
    const usecase = new SupprimerActionDesActionsRecommandeesUsecase(thematiquesRepositorySpy);

    // WHEN
    await usecase.execute('idUtilisateur', 'codeThematique', 'actionType', 'actionId');

    // THEN
    expect(thematiquesRepositorySpy.supprimerActionDesActionsRecommandeesArgs).toStrictEqual({
      utilisateurId: 'idUtilisateur',
      codeThematique: 'codeThematique',
      actionType: 'actionType',
      actionId: 'actionId',
    });
  });
});
