import { Module } from '@nestjs/common';
import { LikeSongService } from './like-song.service';
import { LikeSongController } from './like-song.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeSong } from './entities/like-song.entity';
import { LikeSongRepository } from '@/repositories/like-song.repository';
import { Song } from '@/song/entities/song.entity';
import { SongRepository } from '@/repositories/song.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeSong, Song]),
  ],
  controllers: [LikeSongController],
  providers: [LikeSongService, LikeSongRepository, SongRepository],
})
export class LikeSongModule {}
