import { NotificationNotFound } from './errors/notificationNotFound';
import { NotificationRepository } from '../repositories/notificationRepository';
import { Injectable } from '@nestjs/common';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) { }

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    // Salva o cancelamento dessa notificação, por exemplo
    await this.notificationRepository.save(notification);
  }
}
