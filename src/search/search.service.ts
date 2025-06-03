import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { SongRepository } from '@/repositories/song.repository';
import { PlaylistRepository } from '@/repositories/playlist.repository';
import { UserRepository } from '@/repositories/userRepository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly songRepo: SongRepository,
    private readonly playlistRepo: PlaylistRepository,
    private readonly userRepo: UserRepository
  ) {

  }

  async findAll(type: 'Tracks' | 'Playlist' | 'Artist', keyword: string, user: User) {
    switch (type) {
      case 'Tracks': {
        return await this.songRepo.searchSong(keyword)
      }
      case 'Playlist': {
        return await this.playlistRepo.getPlaylistSearch(keyword)
      }
      case 'Artist': {
        return await this.userRepo.getArtistUserSearch(user, keyword)
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
