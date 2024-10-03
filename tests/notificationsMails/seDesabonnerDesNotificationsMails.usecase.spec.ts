import { SeDesabonnerDesNotificationsMailsUsecase } from '@/domaines/notificationsMails/seDesabonnerDesNotificationsMails.usecase';
import { NotificationsMailsMockRepository } from './adapters/seDesabonnerDesNotificationsMails.repository.mock';
import {
  SeDesabonnerDesNotificationsMailsPresenterImpl,
  SeDesabonnerDesNotificationsMailsViewModel,
} from '@/domaines/notificationsMails/adapters/seDesabonnerDesNotificationsMails.presenter.impl';

describe('Fichier de tests concernant le desabonnement des notifications emails', () => {
  it("Lorsque l'on fait une demande de désabonnement qui est un succes doit presenter un message de succes", async () => {
    // GIVEN
    const idDeDesabonnement = 'idDeDesabonnement';
    const usecase = new SeDesabonnerDesNotificationsMailsUsecase(NotificationsMailsMockRepository.SUCCES);
    // WHEN
    await usecase.execute(idDeDesabonnement, new SeDesabonnerDesNotificationsMailsPresenterImpl(expectation));
    // THEN
    function expectation(viewModel: SeDesabonnerDesNotificationsMailsViewModel) {
      expect(viewModel).toStrictEqual({
        message:
          'Désabonnement de la liste de diffusion de J’agis réussi.<br />Vous ne recevrez plus d’e-mail de notre part.',
      });
    }
  });

  it("Lorsque l'on fait une demande de désabonnement qui est en erreur doit presenter un message d'erreur", async () => {
    // GIVEN
    const idDeDesabonnement = 'idDeDesabonnement';
    const usecase = new SeDesabonnerDesNotificationsMailsUsecase(NotificationsMailsMockRepository.ECHEC);
    // WHEN
    await usecase.execute(idDeDesabonnement, new SeDesabonnerDesNotificationsMailsPresenterImpl(expectation));
    // THEN
    function expectation(viewModel: SeDesabonnerDesNotificationsMailsViewModel) {
      expect(viewModel).toStrictEqual({
        message:
          'Erreur lors du désabonnement de la liste de diffusion de J’agis.<br />Veuillez réessayer ultérieurement.',
      });
    }
  });
});
