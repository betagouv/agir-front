import { PersonnalisationThematiqueEffectueeUsecase } from '@/domaines/thematiques/personnalisationThematiqueEffectuee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepositorySpy } from './adapters/thematiques.repository.spy';
import { SpyActionsEventBus } from '../quizz/finActionQuizz.usecase.spec';
import { ActionsEvent } from '@/domaines/actions/actions.eventbus';

describe("Fichier de test concernant le fait d'avoir terminé la personnalisation d'une thematique", () => {
  it('Quand la personnalisation est terminée doit faire un appel au repository et doit envoyer un event pour refresh les points', async () => {
    // GIVEN
    const thematiquesRepositorySpy = new ThematiquesRepositorySpy();
    const usecase = new PersonnalisationThematiqueEffectueeUsecase(thematiquesRepositorySpy);
    const spyActionsEventBus = new SpyActionsEventBus();
    // WHEN
    await usecase.execute('idUtilisateur', ClefThematiqueAPI.alimentation, spyActionsEventBus);

    // THEN
    expect(thematiquesRepositorySpy.terminerPersonnalisationArgs).toStrictEqual({
      idUtilisateur: 'idUtilisateur',
      clefThematiqueApi: 'alimentation',
    });
    expect(spyActionsEventBus.eventName).toStrictEqual(ActionsEvent.PERSONNALISATION_FAITE);
  });
});
