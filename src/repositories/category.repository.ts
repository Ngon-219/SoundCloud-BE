import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { BaseRepository } from '@/repositories/baseRepo';
import { Repository } from 'typeorm';
import { Category } from '@/song/entities/category.entity';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {
    super(categoryRepo);
  }

  async getSongByCategoryId(category_id: string): Promise<Category[]> {
    return this.categoryRepo.createQueryBuilder('category')
      .leftJoinAndSelect('category.song_category', 'song_category')
      .where('category.category_id = :category_id', { category_id })
      .innerJoinAndSelect('song_category.song', 'song')
      .getMany();
  }
}
