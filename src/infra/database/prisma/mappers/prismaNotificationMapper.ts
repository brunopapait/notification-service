import { Notification as RawNotification } from '@prisma/client';
import { Content } from 'src/application/entities/content';
import { Notification } from 'src/application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      content: new Content(raw.content),
      category: raw.category,
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
      canceledAt: raw.canceledAt,
    }, raw.id);
  }
}
