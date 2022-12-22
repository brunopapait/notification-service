import { makeNotification } from '../../../test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from './../../../test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotification } from './countNotifications';

describe('CountRecipientsNotification', () => {
  it('should be able to count recipient a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientsNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.createNotification(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.createNotification(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    await notificationRepository.createNotification(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    const { count } = await countRecipientsNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });

  it('should be able to count recipient a notification without create a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientsNotification = new CountRecipientNotification(
      notificationRepository,
    );

    const { count } = await countRecipientsNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(0);
  });
});
