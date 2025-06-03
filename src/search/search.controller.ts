import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("/:type/:keyword")
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  findAll(@Param('type') type: 'Tracks' | 'Playlist' | 'Artist', @Param('keyword') keyword: string, @Req() req: any) {
    return this.searchService.findAll(type, keyword, req.user);
  }
}
