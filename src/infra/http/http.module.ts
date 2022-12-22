import { UnreadNotification } from './../../application/useCases/unreadNotification';
import { ReadNotification } from './../../application/useCases/readNotification';
import { GetRecipientNotification } from './../../application/useCases/getRecipientsNotification';
import { CountRecipientNotification } from './../../application/useCases/countNotifications';
import { CancelNotification } from './../../application/useCases/cancelNotification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/useCases/sendNotification';
import { DatabaseModule } from '../../infra/database/database.module';

import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification
  ],
})
export class HttpModule { }
