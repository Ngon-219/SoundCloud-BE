import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSearchHistoryDto } from './dto/create-search_history.dto';
import { UpdateSearchHistoryDto } from './dto/update-search_history.dto';
import { SearchHistoryRepository } from '@/repositories/search_history.repository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class SearchHistoryService {
  constructor(
    private readonly searchHistoryRepo: SearchHistoryRepository
  ) {
  }

  create(user: User, keyword: string) {
    try {
      this.searchHistoryRepo.createKeyword(user, keyword)
    } catch(err) {
      throw new BadRequestException(err)
    }
  }

  findAll(user: User) {
    return this.searchHistoryRepo.getKeyword(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} searchHistory`;
  }

  update(id: number, updateSearchHistoryDto: UpdateSearchHistoryDto) {
    return `This action updates a #${id} searchHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} searchHistory`;
  }
}
