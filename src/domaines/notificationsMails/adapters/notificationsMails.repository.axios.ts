import { AxiosFactory } from '@/axios.factory';
import { NotificationsMailsRepository } from '@/domaines/notificationsMails/ports/notificationsMails.repository';

export class NotificationsMailsRepositoryAxios implements NotificationsMailsRepository {
  async seDesabonnerDesNotificationsMails(idDeDesabonnement: string): Promise<boolean> {
    const axiosInstance = AxiosFactory.getAxios();
    try {
      await axiosInstance.post(`/email/token/disable`, { token: idDeDesabonnement });
      return true;
    } catch {
      return false;
    }
  }
}
