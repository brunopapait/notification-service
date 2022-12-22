import { makeNotification } from '../../../test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from './../../../test/repositories/inMemoryNotificationsRepository';
import { GetRecipientNotification } from './getRecipientsNotification';

describe('GetRecipientsNotification', () => {
  it('should be able to get recipient a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientsNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientsNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' }),
    ]));
  });

  it('should be able to get recipient a notification without create a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientsNotification = new GetRecipientNotification(
      notificationRepository
    );

    const { notifications } = await countRecipientsNotification.execute({
      recipientId: 'recipient-3',
    });

    expect(notifications).toHaveLength(0);
  });
});
