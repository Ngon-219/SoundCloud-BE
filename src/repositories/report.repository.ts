import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";
import { Playlist } from "@/playlist/entities/playlist.entity";
import { Report } from "@/report/entities/report.entity";

@Injectable()
export class ReportRepository extends BaseRepository<Report> {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {
    super(reportRepo);
  }

  async getReportBySongId(songId) {
    return this.reportRepo.createQueryBuilder('report')
      .innerJoinAndSelect('report.song', 'song')
      .innerJoinAndSelect('report.user', 'user')
      .where('song.song_id = :songId', {songId})
      .getMany();
  }
  
}