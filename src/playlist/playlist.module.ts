import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { SongPlaylist } from './entities/song-playlist.entity';
import { PlaylistRepository } from '@/repositories/playlist.repository';
import { SongPlaylistRepository } from '@/repositories/song-playlist.repository';
import { UploadModule } from '@/upload/upload.module';
import { UploadService } from '@/upload/upload.service';
import { SongRepository } from '@/repositories/song.repository';
import { Song } from '@/song/entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Playlist,
      SongPlaylist,
      Song,
    ]),
    UploadModule, 
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository, SongPlaylistRepository, UploadService, SongRepository],
  exports: [PlaylistService, PlaylistRepository, SongPlaylistRepository, SongRepository],
})
export class PlaylistModule {}
