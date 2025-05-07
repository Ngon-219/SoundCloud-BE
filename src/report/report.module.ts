import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportRepository } from '@/repositories/report.repository';
import { SongRepository } from '@/repositories/song.repository';
import { Song } from '@/song/entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report,
      Song
    ])
  ],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository, SongRepository],
})
export class ReportModule {}
