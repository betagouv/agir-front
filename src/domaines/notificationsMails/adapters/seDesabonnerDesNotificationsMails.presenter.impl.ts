import { SeDesabonnerDesNotificationsMailsPresenter } from '@/domaines/notificationsMails/ports/seDesabonnerDesNotificationsMails.presenter';

export interface SeDesabonnerDesNotificationsMailsViewModel {
  message: string;
}

export class SeDesabonnerDesNotificationsMailsPresenterImpl implements SeDesabonnerDesNotificationsMailsPresenter {
  constructor(
    private readonly seDesabonnerDesNotificationsMailsViewModel: (
      viewModel: SeDesabonnerDesNotificationsMailsViewModel,
    ) => void,
  ) {}

  presentSucces(): void {
    this.seDesabonnerDesNotificationsMailsViewModel({
      message:
        'Désabonnement de la liste de diffusion de J’agis réussi.<br />Vous ne recevrez plus d’e-mail de notre part.',
    });
  }

  presentErreur(): void {
    this.seDesabonnerDesNotificationsMailsViewModel({
      message:
        'Erreur lors du désabonnement de la liste de diffusion de J’agis.<br />Veuillez réessayer ultérieurement.',
    });
  }
}
