export interface NotificationsMailsRepository {
  seDesabonnerDesNotificationsMails(idDeDesabonnement: string): Promise<boolean>;
}
