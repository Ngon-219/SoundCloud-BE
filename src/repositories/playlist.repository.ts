import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";
import { Playlist } from "@/playlist/entities/playlist.entity";

@Injectable()
export class PlaylistRepository extends BaseRepository<Playlist> {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
  ) {
    super(playlistRepo);
  }

  async getPlayListDetail(playlistId: string) {
    return this.playlistRepo
    .createQueryBuilder('playlist')
    .leftJoinAndSelect('playlist.songPlaylist', 'song_playlist')
    .leftJoinAndSelect('song_playlist.song', 'song')
    .where('playlist.playlist_id = :playlistId', { playlistId })
      .getOne(); // dùng getOne vì playlistId là duy nhất
  }
  
}