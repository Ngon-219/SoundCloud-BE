import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";
import { User } from "@/user/entities/user.entity";

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

  async getTopTenSongs() {
    return this.songRepo
      .createQueryBuilder('song')
      .orderBy('song.view', 'DESC')
      .take(10)
      .getMany();
  }

  async getRandomFourSongsFromTopTen() {
    const topTenSongs = await this.songRepo
      .createQueryBuilder('song')
      .orderBy('song.view', 'DESC')
      .take(10)
      .getMany();

    // Random chọn 4 bài trong topTenSongs
    const shuffled = topTenSongs.sort(() => 0.5 - Math.random()); // xáo trộn mảng
    const randomFour = shuffled.slice(0, 4); // lấy 4 phần tử đầu tiên

    return randomFour;
  }

   
  async getSongById(songId: string) {
    return this.songRepo
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.user', 'user')
      .where('song.song_id = :songId', { songId })
      .getOne();
  }

  async getSongRandom() {
    return this.songRepo
      .createQueryBuilder('song')
      .orderBy('RANDOM()')
      .take(1)
      .getOne();
  }

  async getYourSong(user: User) {
    return this.songRepo
    .createQueryBuilder('song')
    .leftJoinAndSelect('song.user', 'user')
    .where('user.user_id = :userId', {userId: user.user_id})
    .getMany();
  }

async searchSong(keyword: string) {
  return this.songRepo
    .createQueryBuilder('song')
    .leftJoinAndSelect('song.user', 'user')
    .where(`unaccent(lower(song.song_name)) ILIKE unaccent(lower(:keyword))`, { keyword: `%${keyword}%` })
    .getMany();
}

}