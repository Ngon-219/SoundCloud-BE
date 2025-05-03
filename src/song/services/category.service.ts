// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '@/repositories/category.repository';
import { Repository } from 'typeorm';
import { SongCategoryRepository } from '@/repositories/songCategory.repository';
import { Song } from '../entities/song.entity';
import { SongRepository } from '@/repositories/song.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly songCategoryRepo: SongCategoryRepository,
    private readonly songRepo: SongRepository
  ) {}

  async seedCategories(): Promise<string> {
    const popularCategories = [
      'Pop',
      'Rock',
      'Hip Hop',
      'Jazz',
      'Classical',
      'EDM',
      'Country',
      'R&B',
      'Reggae',
      'Folk'
    ];

    for (const name of popularCategories) {
      const exists = await this.categoryRepo.findOne({category_name: name });
      if (!exists) {
        const newCategory = this.categoryRepo.create({ category_name: name });
        await this.categoryRepo.save(newCategory);
      }
    }

    return 'Seeded popular music categories.';
  }

  async createCategory(category_name: string): Promise<Category> {
    const newCategory = this.categoryRepo.create({ category_name });
    return this.categoryRepo.save(newCategory);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepo.findAll();
  }

  async editCategory(id: string, category_name: string): Promise<Category> {
    const category = await this.categoryRepo.findOne( { category_id: id } );
    if (!category) {
      throw new Error('Category not found');
    }
    category.category_name = category_name;
    return this.categoryRepo.save(category);
  }

  async getSongsByCategory(category_id: string): Promise<any[]> {
    const category = await this.categoryRepo.findOne({ category_id });
    if (!category) {
      throw new Error('Category not found');
    }

    const song = await this.categoryRepo.getSongByCategoryId(category_id);
    if (!song) {
      throw new Error('No songs found for this category');
    }
    
    return song;

  }
}
