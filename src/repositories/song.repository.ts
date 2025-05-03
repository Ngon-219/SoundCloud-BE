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

  async getSongsInPlaylist(playlistId: string) {
    return this.songRepo
      .createQueryBuilder('song')
      .innerJoin('song.song_playlist', 'song_playlist')
      .innerJoin('song_playlist.playlist', 'playlist')
      .where('playlist.playlist_id = :playlistId', { playlistId })
      .getMany();
  }
  
}