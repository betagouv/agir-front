import { UtilisateurRepositoryMock } from '../authentification/adapters/utilisateur.repository.mock';
import { SpyActionsEventBus } from '../quizz/finActionQuizz.usecase.spec';
import { FermerMessageResetUsecase } from '@/domaines/compte/fermerMessageReset.usecase';
import { ActionsEvent } from '@/domaines/actions/actions.eventbus';

describe('Fichier de tests concernant la lecture du message du reset', () => {
  it('Doit publier un event pour mettre à jour le score quand le message du reset a été lu', async () => {
    // GIVEN
    const spyActionsEventBus = new SpyActionsEventBus();
    const usecase = new FermerMessageResetUsecase(UtilisateurRepositoryMock.nouvelleInstance());
    // WHEN
    await usecase.execute('idUtilisateur', spyActionsEventBus);
    // THEN
    expect(spyActionsEventBus.eventName).toEqual(ActionsEvent.RESET_VU);
  });
});
