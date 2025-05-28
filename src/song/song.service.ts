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
import { LikeSong } from '@/like-song/entities/like-song.entity';
import { LikeSongRepository } from '@/repositories/like-song.repository';
import { ListeningHistoryRepo } from '@/repositories/listening-history.repository';
import { Context, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { MailService } from '@/mail/mail.service';
import { PublisherService } from '@/publisher/publisher.service';

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
    private songCategoryRepository: SongCategoryRepository,
    private readonly LikeSongRepository: LikeSongRepository,
    private readonly listeningHistoryRepository: ListeningHistoryRepo,
    // @InjectBot() private readonly bot: Telegraf<Context>
    private readonly mailService: MailService,
    private readonly publisher_service: PublisherService
  ) {

  }

  async create(file: Express.Multer.File[], user: User, category_id: string[], song_name: string) {
    console.log("user chat id", process.env.USER_TELEGRAM_CHAT_ID);
    try {
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
          name: song_name,
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
    
      // await this.bot.telegram.sendMessage(process.env.USER_TELEGRAM_CHAT_ID, `
      //   Have new upload song from user ${user.username} with user email ${user.email}🫵🫵🫵
      // `)

      await this.publisher_service.sendMailNoti(`<p>Have new upload song from user <b>${user.username}</b> with user email <b>${user.email}</b>🫵🫵🫵<p>`)

      return {
        message: "upload song successfully",
        song: newSong
      }
    } catch(err) {
      // await this.bot.telegram.sendMessage(process.env.USER_TELEGRAM_CHAT_ID, `
      //   Fail to upload song user ${user.username} with user email ${user.email}⚠️⚠️⚠️
      // `)

      await this.publisher_service.sendMailNoti(`<p>Fail to upload song user <b>${user.username}</b> with user email <b>${user.email}</b>⚠️⚠️⚠️</p>`)
      return {
        message: "fail to upload",
        err: err
      }
    }
  }

  async getTopTenSong(user: User) {
    const topTenSongs = await this.songRepository.getTopTenSongs();
  
    return topTenSongs;
  }
  

  async playSong(song_id: string, user: any) {
    const song = await this.songRepository.getSongById(song_id);
    const checkLikeSong = await this.LikeSongRepository.checkLikeSong(user, song);
  
    if (!song) {
      throw new Error('Song not found');
    }
  
    const updateView = await this.songRepository.preload({
      song_id: song.song_id,
      view: song.view + 1,
    });

    await this.songRepository.save(updateView);

    const listeningHistory = await this.listeningHistoryRepository.create({
      user: user,
      song: song,
    });
    
    await this.listeningHistoryRepository.save(listeningHistory);

    const {user: _user, ...rest} = song;
  
    return {
      is_liked: checkLikeSong,
      artist: song.user.username,
      ...rest,
    };
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

  async getRandomSongId() {
    const songs = await this.songRepository.getSongRandom();
    if (!songs) {
      throw new Error('Song not found');
    }
    return songs;
  }
}