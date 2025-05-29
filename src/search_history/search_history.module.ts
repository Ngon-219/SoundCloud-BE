import { Module } from '@nestjs/common';
import { SearchHistoryService } from './search_history.service';
import { SearchHistoryController } from './search_history.controller';
import { SearchHistoryRepository } from '@/repositories/search_history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchHistory } from './entities/search_history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchHistory]),
  ],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService, SearchHistoryRepository],
  exports: [SearchHistoryService, SearchHistoryRepository]
})
export class SearchHistoryModule {}
