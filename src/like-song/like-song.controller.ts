import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikeSongService } from './like-song.service';
import { CreateLikeSongDto } from './dto/create-like-song.dto';
import { UpdateLikeSongDto } from './dto/update-like-song.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('like-song')
export class LikeSongController {
  constructor(private readonly likeSongService: LikeSongService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  create(@Body() createLikeSongDto: CreateLikeSongDto, @Req() req: any) {
    return this.likeSongService.create(createLikeSongDto, req.user);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  findAll(@Req() req: any) {
    return this.likeSongService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeSongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeSongDto: UpdateLikeSongDto) {
    return this.likeSongService.update(+id, updateLikeSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeSongService.remove(id);
  }
}
