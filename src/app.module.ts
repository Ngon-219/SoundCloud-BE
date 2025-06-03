import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ListeningHistory } from './user/entities/listening-history.entity';

import { AuthModule } from './auth/auth.module';

import { UploadModule } from './upload/upload.module';

import { SongModule } from './song/song.module';
import { Song } from './song/entities/song.entity';
import { SongCategory } from './song/entities/song-category.entity';
import { Category } from './song/entities/category.entity';

import { PlaylistModule } from './playlist/playlist.module';
import { Playlist } from './playlist/entities/playlist.entity';
import { SongPlaylist } from './playlist/entities/song-playlist.entity';

import { LikeSongModule } from './like-song/like-song.module';
import { LikeSong } from './like-song/entities/like-song.entity';

import { ReportModule } from './report/report.module';
import { Report } from './report/entities/report.entity';

import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis-config.config';
import { redisStore } from 'cache-manager-redis-store';
import { ConsumerModule } from './consumer/consumer.module';
import { PublisherModule } from './publisher/publisher.module';
import { SearchHistoryModule } from './search_history/search_history.module';
import { SearchHistory } from './search_history/entities/search_history.entity';
import { PaypalModule } from './paypal/paypal.module';
import { TransactionTable } from './paypal/entities/transaction.entity';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, ListeningHistory, Song, SongCategory, Category, Playlist, SongPlaylist, LikeSong, Report, Comment, SearchHistory, TransactionTable],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    // TelegrafModule.forRoot({
    //   token: process.env.TELEGRAM_BOT_TOKEN,
    // }),
    UserModule,
    AuthModule,
    UploadModule,
    SongModule,
    PlaylistModule,
    LikeSongModule,
    ReportModule,
    CommentModule,
    MailModule,
    ConsumerModule,
    PublisherModule,
    SearchHistoryModule,
    PaypalModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
