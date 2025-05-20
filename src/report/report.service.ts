import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportRepository } from '@/repositories/report.repository';
import { SongRepository } from '@/repositories/song.repository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepo: ReportRepository,
    private readonly songRepo: SongRepository,
  ) {

  }
  async create(createReportDto: CreateReportDto, user: User) {
    const reportSong = await this.songRepo.findOne({song_id: createReportDto.song_id});

    if (!reportSong) {
      throw new BadRequestException("song not found");
    }

    const createReport = await this.reportRepo.create({
      song: reportSong,
      user: user,
      content: createReportDto.content,
    })

    await this.reportRepo.save(createReport);

    return createReport;
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: string) {
    return this.reportRepo.getReportBySongId(id);
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
