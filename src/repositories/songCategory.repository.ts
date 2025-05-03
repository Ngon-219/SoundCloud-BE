import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { BaseRepository } from '@/repositories/baseRepo';
import { Repository } from 'typeorm';
import { SongCategory } from '@/song/entities/song-category.entity';

@Injectable()
export class SongCategoryRepository extends BaseRepository<SongCategory> {
  constructor(
    @InjectRepository(SongCategory)
    private readonly songCategory: Repository<SongCategory>,
  ) {
    super(songCategory); 
  }
}
