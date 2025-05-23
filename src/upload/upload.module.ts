import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Telegraf } from 'telegraf';

@Module({
  controllers: [UploadController],
  providers: [UploadService, Telegraf],
})
export class UploadModule {}
