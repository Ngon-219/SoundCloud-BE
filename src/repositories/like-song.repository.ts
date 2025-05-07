import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { BaseRepository } from '@/repositories/baseRepo';
import { Repository } from 'typeorm';
import { Category } from '@/song/entities/category.entity';
import { LikeSong } from '@/like-song/entities/like-song.entity';

@Injectable()
export class LikeSongRepository extends BaseRepository<LikeSong> {
  constructor(
    @InjectRepository(LikeSong)
    private readonly likeSongRepo: Repository<LikeSong>,
  ) {
    super(likeSongRepo);
  }

  async getYourLikeSong(user: User): Promise<LikeSong[]> {
    // return this.likeSongRepo.find({
    //   where: {
    //     user: {user_id: user.user_id},
    //     status: true,
    //   },
    //   relations: ['song'],
    // });

    return this.likeSongRepo.createQueryBuilder('like_song')
      .leftJoinAndSelect('like_song.song', 'song')
      .where('like_song.user = :userId', { userId: user.user_id })
      .andWhere('like_song.status = :status', { status: true })
      .leftJoinAndSelect('song.user', 'user')
      .getMany();
  }

  async checkLikeSong(user: User, song: any): Promise<boolean> {
    const likeSong = await this.likeSongRepo.findOne({
      where: {
        user: user,
        song: song,
        status: true,
      },
      relations: ['song'],
    });
    
    console.log("likeSong", likeSong);

    if (likeSong) {
      return true;
    } 

    return false;
  }

  async getLikeSongBySongId(user: User, sondId: string): Promise<any> {
    return this.likeSongRepo.findOne({
      where: {
        song: {song_id: sondId},
      },
      relations: ['song'],
    });
  }
}
