import { InMemoryNotificationsRepository } from './../../../test/repositories/inMemoryNotificationsRepository';
import { SendNotification } from './sendNotification';

describe('SendNotification', () => {
  it('should be able send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationRepository);
    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example recipient id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
