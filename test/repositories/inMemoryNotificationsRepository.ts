import { Notification } from 'src/application/entities/notification';
import { NotificationRepository } from 'src/application/repositories/notificationRepository';

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notiricationIndex = this.notifications.findIndex(
      (notification) => notification.id === notification.id,
    );

    if (notiricationIndex >= 0) {
      this.notifications[notiricationIndex] = notification;
    }
  }

  async createNotification(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }
}
