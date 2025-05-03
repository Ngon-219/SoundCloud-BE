import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";

@Injectable()
export class SongRepository extends BaseRepository<Song> {
  constructor(
    @InjectRepository(Song)
    private readonly songRepo: Repository<Song>,
  ) {
    super(songRepo);
  }
}