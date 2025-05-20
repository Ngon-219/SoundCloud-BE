import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
import { ListeningHistory } from './user/entities/listening-history.entity';
import { ReportModule } from './report/report.module';
import { Report } from './report/entities/report.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin',
      username: 'admin',
      entities: [User, Song, SongCategory, Category, Playlist, SongPlaylist, LikeSong, ListeningHistory, Report, Comment],
      database: 'soundcloud',
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
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
  providers: [AppService, AuthModule],
})
export class AppModule {}