import { NotificationsMailsRepository } from '@/domaines/notificationsMails/ports/notificationsMails.repository';

export class NotificationsMailsMockRepository implements NotificationsMailsRepository {
  public static readonly SUCCES = new NotificationsMailsMockRepository(true);
  public static readonly ECHEC = new NotificationsMailsMockRepository(false);
  private constructor(private readonly succes: boolean) {}
  async seDesabonnerDesNotificationsMails(idDeDesabonnement: string): Promise<boolean> {
    return Promise.resolve(this.succes);
  }
}
