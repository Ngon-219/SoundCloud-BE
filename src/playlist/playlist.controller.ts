import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Req } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  create(@UploadedFile() image: Express.Multer.File, @Req() req: any, @Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(image, req.user, createPlaylistDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
