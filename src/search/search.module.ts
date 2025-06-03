import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SongRepository } from '@/repositories/song.repository';
import { UserRepository } from '@/repositories/userRepository';
import { PlaylistRepository } from '@/repositories/playlist.repository';
import { Song } from '../song/entities/song.entity';
import { User } from '../user/entities/user.entity';
import { Playlist } from '../playlist/entities/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song, User, Playlist])
  ],
  controllers: [SearchController],
  providers: [SearchService, SongRepository, UserRepository, PlaylistRepository],
  exports: [SearchService, SongRepository, UserRepository, PlaylistRepository],
})
export class SearchModule {}
