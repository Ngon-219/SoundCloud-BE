import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @UseInterceptors(FilesInterceptor('files'))
  create(@UploadedFiles() files: Express.Multer.File[], @Req() req: any, @Body('category_id') category_id: string[], @Body('song_name') song_name: string) {
    console.log("files", files);
    return this.songService.create(files, req.user, category_id, song_name);
  }

  @Get('get-top-ten-song')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  getTopTenSong(@Req() req: any) {
    return this.songService.getTopTenSong(req.user);
  }

  @Get('random-song-id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  getRandomSongId() {
    return this.songService.getRandomSongId();
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.songService.playSong(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(id);
  }
}
