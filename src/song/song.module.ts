import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongRepository } from '@/repositories/song.repository';
import { UploadModule } from '@/upload/upload.module';
import { UploadService } from '@/upload/upload.service';
import { UserModule } from '@/user/user.module';
import { CategoryRepository } from '@/repositories/category.repository';
import { SongCategoryRepository } from '@/repositories/songCategory.repository';
import { SongCategory } from '@/song/entities/song-category.entity';
import { Category } from '@/song/entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { LikeSongRepository } from '@/repositories/like-song.repository';
import { LikeSong } from '@/like-song/entities/like-song.entity';
import { ListeningHistory } from '@/user/entities/listening-history.entity';
import { ListeningHistoryRepo } from '@/repositories/listening-history.repository';
import { Telegraf } from 'telegraf';
import { MailService } from '@/mail/mail.service';
import { PublisherService } from '@/publisher/publisher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Song,
      SongCategory,
      Category,
      LikeSong,
      ListeningHistory
    ]),
    UploadModule,
    UserModule,
  ],
  controllers: [SongController, CategoryController],
  providers: [SongService, SongRepository, UploadService, CategoryRepository, SongCategoryRepository, CategoryService, LikeSongRepository, ListeningHistoryRepo, MailService, PublisherService],
  exports: [SongService, SongRepository, UploadService, CategoryRepository, SongCategoryRepository, CategoryService, LikeSongRepository, ListeningHistoryRepo, MailService, PublisherService],
})
export class SongModule {}
