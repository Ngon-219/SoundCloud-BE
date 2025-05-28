import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { MailService } from '@/mail/mail.service';

@Module({
  controllers: [ConsumerService],
  providers: [ConsumerService, MailService]
})
export class ConsumerModule {}
