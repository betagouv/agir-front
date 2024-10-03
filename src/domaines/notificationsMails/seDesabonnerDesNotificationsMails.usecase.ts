import { NotificationsMailsRepository } from '@/domaines/notificationsMails/ports/notificationsMails.repository';
import { SeDesabonnerDesNotificationsMailsPresenter } from '@/domaines/notificationsMails/ports/seDesabonnerDesNotificationsMails.presenter';

export class SeDesabonnerDesNotificationsMailsUsecase {
  constructor(private readonly notificationsMailsRepository: NotificationsMailsRepository) {}

  async execute(
    idDeDesabonnement: string,
    seDesabonnerDesNotificationsMailsPresenter: SeDesabonnerDesNotificationsMailsPresenter,
  ): Promise<void> {
    const succes = await this.notificationsMailsRepository.seDesabonnerDesNotificationsMails(idDeDesabonnement);
    if (succes) {
      seDesabonnerDesNotificationsMailsPresenter.presentSucces();
    } else {
      seDesabonnerDesNotificationsMailsPresenter.presentErreur();
    }
  }
}
