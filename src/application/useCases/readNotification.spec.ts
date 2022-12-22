import { NotificationNotFound } from './errors/notificationNotFound';
import { InMemoryNotificationsRepository } from './../../../test/repositories/inMemoryNotificationsRepository';
import { makeNotification } from './../../../test/factories/notificationFactory';
import { ReadNotification } from './readNotification';

describe('ReadNotification', () => {
  it('should be able read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    notificationRepository.createNotification(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be able read a notification when it not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'notification id not exist',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
