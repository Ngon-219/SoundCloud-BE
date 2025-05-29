import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { BaseRepository } from '@/repositories/baseRepo';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  async getArtistUser(user: User): Promise<User[]> {
    return this.userRepo.createQueryBuilder('user')
      .innerJoinAndSelect('user.songs', 'song')
      .where('user.user_id != :userId', {userId: user.user_id})
      .getMany();
  }

  async getArtistDetailById(userId) {
    return this.userRepo.createQueryBuilder('user')
    .where({user_id: userId})
    .innerJoinAndSelect('user.songs', 'song')
    .getOne()
  }
}
