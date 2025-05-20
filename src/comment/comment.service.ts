import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from '@/repositories/comment.repository';
import { SongRepository } from '@/repositories/song.repository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly songRepo: SongRepository
  ) {

  }
  async create(createCommentDto: CreateCommentDto, user:User) {
    const commentSong = await this.songRepo.findOne({song_id: createCommentDto.song_id});

    if (!commentSong) {
      throw new BadRequestException("Song not found");
    }

    const createComment = await this.commentRepo.create({
      user: user,
      song: commentSong,
      content: createCommentDto.content
    })

    await this.commentRepo.save(createComment);

    return createComment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: string) {
    return this.commentRepo.getCommentBySongId(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
