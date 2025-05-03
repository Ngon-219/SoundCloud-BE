import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from '@/repositories/playlist.repository';
import { SongPlaylistRepository } from '@/repositories/song-playlist.repository';
import { UploadService } from '@/upload/upload.service';
import { folderName } from '@/song/song.service';
import { SongRepository } from '@/repositories/song.repository';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly playlistRepository: PlaylistRepository,
    private readonly songPlaylistRepository: SongPlaylistRepository,
    private readonly uploadService: UploadService,
    private readonly songRepository: SongRepository,
  ) {}

  async create(image: Express.Multer.File, user: any, createPlaylistDto: CreatePlaylistDto) {
    const uploadImage = await this.uploadService.create(image, folderName.image)
  
    const songList = await Promise.all(
      createPlaylistDto.song_id.map((songId) =>
        this.songRepository.findOne({ song_id: songId })
      )
    );
  
    const playlist = this.playlistRepository.create({
      name: createPlaylistDto.name,
      is_public: createPlaylistDto.is_public,
      user: user,
      playlist_image: uploadImage.url,
    });
  
    const newPlaylist = await this.playlistRepository.save(playlist);
  
    const songPlaylistEntities = songList.map((songItem) =>
      this.songPlaylistRepository.create({
        song: songItem,
        playlist: newPlaylist,
      })
    );
  
    await this.songPlaylistRepository.saveMany(songPlaylistEntities);
  
    return newPlaylist;
  }
  

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: string) {
    const playlist = this.playlistRepository.getPlayListDetail(id);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    return playlist;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
