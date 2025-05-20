import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '@/song/entities/song.entity';
import { Comment } from './entities/comment.entity';
import { SongRepository } from '@/repositories/song.repository';
import { CommentRepository } from '@/repositories/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Song,
      Comment
    ])
  ],
  controllers: [CommentController],
  providers: [CommentService, SongRepository, CommentRepository],
})
export class CommentModule {}
