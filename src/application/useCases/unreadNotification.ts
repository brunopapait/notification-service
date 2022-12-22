import { NotificationNotFound } from './errors/notificationNotFound';
import { NotificationRepository } from '../repositories/notificationRepository';
import { Injectable } from '@nestjs/common';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) { }

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    // salvar essa notificação, por exemplo
    await this.notificationRepository.save(notification);
  }
}
