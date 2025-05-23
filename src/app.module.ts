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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
        entities: [User, ListeningHistory, Song, SongCategory, Category, Playlist, SongPlaylist, LikeSong, Report, Comment],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
    UserModule,
    AuthModule,
    UploadModule,
    SongModule,
    PlaylistModule,
    LikeSongModule,
    ReportModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
