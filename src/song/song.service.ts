import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { User } from '@/user/entities/user.entity';
import { UploadService } from '@/upload/upload.service';
import { UserRepository } from '@/repositories/userRepository';
import { SongRepository } from '@/repositories/song.repository';
import { Song, SongStatus } from './entities/song.entity';
import { parseBuffer } from 'music-metadata';
import axios from 'axios';
import { Readable } from 'stream';
import * as ffmpeg from 'fluent-ffmpeg';
import { CategoryRepository } from '@/repositories/category.repository';
import { SongCategoryRepository } from '@/repositories/songCategory.repository';

export enum folderName  {
  music = "music",
  image = "image"
}

@Injectable()
export class SongService {
  constructor(
    private uploadService: UploadService,
    private songRepository: SongRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
    private songCategoryRepository: SongCategoryRepository
  ) {

  }

  async create(file: Express.Multer.File[], user: User, category_id: string[]) {
    const metadata = await parseBuffer(file[0].buffer, file[0].mimetype);
    const durationInSeconds = metadata.format.duration || 0;
    const uploadMusic = await this.uploadService.create(file[0], folderName.music);
    const uploadImage = await this.uploadService.create(file[1], folderName.image);

    const category = [];
    category_id = Array.isArray(category_id) ? category_id : [category_id];
    for (let i = 0; i < category_id.length; i++) {
      console.log("categoryItem", category_id[i]);
      const categoryItem = await this.categoryRepository.findOne({category_id: category_id[i]});
      if (categoryItem) {
        category.push(categoryItem);
      } else {
        throw new Error('Category not found');
      }
    }

    const newSong = await this.songRepository.create(
      {
        link_song: uploadMusic.url,
        song_image: uploadImage.url,
        status: SongStatus.PENDING,
        view: 0,
        created_at: new Date(),
        updated_at: new Date(),
        user: user,
        duration: Math.floor(durationInSeconds),
      }
    )

    await this.songRepository.save(newSong);

    const songCategoryEntities = category.map((item) =>
      this.songCategoryRepository.create({
        song: newSong,
        category: item,
      })
    );
  
  this.songCategoryRepository.saveMany(songCategoryEntities)

    return {
      message: "upload song successfully",
      song: newSong
    }
  }

  async getSongBuffer(song_id: string) {
    const song = await this.songRepository.findOne({song_id: song_id});
    if (!song) {
      throw new Error('Song not found');
    }

    const segments: Buffer[] = [];

    const response = await axios.get(song.link_song, { responseType: 'arraybuffer' });

    const fileBuffer = Buffer.from(response.data);

    console.log("song response from cloudaniry", fileBuffer);

    const durationInSeconds = song.duration || 75;
    const totalSegments = Math.ceil(durationInSeconds / 20);

    for (let i = 0; i < totalSegments; i++) {
      const start = i * 20;
      const end = Math.min((i + 1) * 20, durationInSeconds);

      const buffer = await this.cutAudioToBuffer(fileBuffer, start, end);
      segments.push(buffer);
    }

    return segments;
  }

  private cutAudioToBuffer(inputBuffer: Buffer, start: number, end: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const inputStream = Readable.from(inputBuffer);
      const outputBuffers: Buffer[] = [];

      const ffmpegProcess = ffmpeg(inputStream)
        .inputFormat('mp3')
        .setStartTime(start)
        .setDuration(end - start)
        .format('mp3')
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(err);
        });

      const outputStream = ffmpegProcess.pipe();

      outputStream.on('data', (chunk: Buffer) => {
        outputBuffers.push(chunk);
      });

      outputStream.on('end', () => {
        resolve(Buffer.concat(outputBuffers));
      });
    });
  }


  findAll() {
    return this.songRepository.findAll();
  }

  findOne(id: string) {
    return this.songRepository.findOne({ song_id: id });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: string) {
    return this.songRepository.delete({ song_id: id }); 
  }
}
