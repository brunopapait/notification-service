import { NotificationNotFound } from './errors/notificationNotFound';
import { InMemoryNotificationsRepository } from './../../../test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotification';
import { makeNotification } from './../../../test/factories/notificationFactory';

describe('CancelNotification', () => {
  it('should be able cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    notificationRepository.createNotification(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be able cancel a notification when it not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'notification id not exist',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
