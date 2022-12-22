import { NotificationNotFound } from './errors/notificationNotFound';
import { InMemoryNotificationsRepository } from './../../../test/repositories/inMemoryNotificationsRepository';
import { makeNotification } from './../../../test/factories/notificationFactory';
import { UnreadNotification } from './unreadNotification';

describe('UnreadNotification', () => {
  it('should be able unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    notificationRepository.createNotification(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull;
  });

  it('should be able unread a notification when it not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'notification id not exist',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
