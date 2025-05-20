import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";
import { Playlist } from "@/playlist/entities/playlist.entity";
import { Report } from "@/report/entities/report.entity";
import { Comment } from "@/comment/entities/comment.entity";

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {
    super(commentRepo);
  }

  async getCommentBySongId(songId: string) {
    return this.commentRepo.createQueryBuilder('comment')
      .innerJoinAndSelect('comment.song', 'song')
      .innerJoinAndSelect('comment.user', 'user')
      .where('song.song_id = :songId', { songId }) 
      .getMany();
  }
}