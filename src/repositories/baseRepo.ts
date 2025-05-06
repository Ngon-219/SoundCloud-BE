import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async delete(where: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(where);
  }

  async preload(data: DeepPartial<T>): Promise<T> {
    return this.repository.preload(data);
  }
}
