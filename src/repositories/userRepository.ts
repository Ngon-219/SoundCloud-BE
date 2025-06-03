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

  async updateUserInfo(userId, avatarUrl, username) {
    await this.userRepo.update(
      { user_id: userId },
      { avatar: avatarUrl, username: username }
    );

    const updatedUser = await this.getArtistDetailById(userId);
    return updatedUser;

  }

  async getArtistUserSearch(user: User, keyword: string): Promise<User[]> {
  return this.userRepo.createQueryBuilder('user')
    .innerJoinAndSelect('user.songs', 'song')
    .where('user.user_id != :userId', {userId: user.user_id})
    .where(`unaccent(lower(user.user_name)) ILIKE unaccent(lower(:keyword))`, { keyword: `%${keyword}%` })
    .getMany();
}
}
