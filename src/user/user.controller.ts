import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Req, UseGuards } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("artist")
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  getArtist(@Req() req: any) {
    return this.userService.getArtist(req.user);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  findAll(@Req() req:any) {
    return this.userService.findOne(req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update-user')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.user_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
