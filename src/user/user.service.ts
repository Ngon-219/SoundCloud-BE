import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '@/repositories/userRepository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor
(
    private readonly userRepository: UserRepository,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userRepository.getArtistDetailById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUserInfo(id, updateUserDto.avatarUrl, updateUserDto.username);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getArtist(user: User) {
    return this.userRepository.getArtistUser(user);
  }
}
