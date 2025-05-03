import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";
import { SongPlaylist } from "@/playlist/entities/song-playlist.entity";

@Injectable()
export class SongPlaylistRepository extends BaseRepository<SongPlaylist> {
  constructor(
    @InjectRepository(SongPlaylist)
    private readonly songPlaylistRepo: Repository<SongPlaylist>,
  ) {
    super(songPlaylistRepo);
  }
}