import { NotificationRepository } from '../repositories/notificationRepository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) { }

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request;

    const countManyRecipientId =
      await this.notificationRepository.countManyByRecipientId(recipientId);
    return { count: countManyRecipientId };
  }
}
