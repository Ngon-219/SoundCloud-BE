import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Telegraf } from 'telegraf';
import { MailService } from '@/mail/mail.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, MailService],
  exports: [UploadService, MailService]
})
export class UploadModule {}
