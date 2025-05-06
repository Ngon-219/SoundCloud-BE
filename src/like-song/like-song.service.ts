import { Injectable } from '@nestjs/common';
import { CreateLikeSongDto } from './dto/create-like-song.dto';
import { UpdateLikeSongDto } from './dto/update-like-song.dto';
import { LikeSongRepository } from '@/repositories/like-song.repository';
import { SongRepository } from '@/repositories/song.repository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class LikeSongService {

  constructor(
    private readonly likeSongRepository: LikeSongRepository,
    private readonly songRepository: SongRepository
  ) {}

  async create(createLikeSongDto: CreateLikeSongDto, user: any) {
    const likeSong = await this.songRepository.findOne({song_id: createLikeSongDto.songId});
    if (!likeSong) {
      return {
        message: "not found song",
      }
    }

    const checkLikeSong = await this.likeSongRepository.getLikeSongBySongId(user, likeSong.song_id);
    if (checkLikeSong) {
      checkLikeSong.status = !checkLikeSong.status;
      await this.likeSongRepository.save(checkLikeSong);
      return {
        message: "change like song",
        data: checkLikeSong,
      };
    }

    const createLikeSong = await this.likeSongRepository.create({
      user: user,
      song: likeSong,
    });

    await this.likeSongRepository.save(createLikeSong);

    return {
      message: "success",
      data: createLikeSong,
    };
  }

  findAll(user: User) {
    return this.likeSongRepository.getYourLikeSong(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} likeSong`;
  }

  update(id: number, updateLikeSongDto: UpdateLikeSongDto) {
    return `This action updates a #${id} likeSong`;
  }

  remove(id: string) {
    const deleteLikeSong = this.likeSongRepository.delete({like_song_id: id});
    if (!deleteLikeSong) {
      return {
        message: "not found like song",
      }
    }
    return {
      message: "success",
      data: deleteLikeSong,
    };
  }
}
