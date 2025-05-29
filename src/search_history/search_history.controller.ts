import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SearchHistoryService } from './search_history.service';
import { CreateSearchHistoryDto } from './dto/create-search_history.dto';
import { UpdateSearchHistoryDto } from './dto/update-search_history.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Post(':keyword')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt') 
  create(@Req() req:any, @Param('keyword') keyword: string) {
    return this.searchHistoryService.create(req.user, keyword);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  findAll(@Req() req: any) {
    return this.searchHistoryService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchHistoryDto: UpdateSearchHistoryDto) {
    return this.searchHistoryService.update(+id, updateSearchHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchHistoryService.remove(+id);
  }
}
