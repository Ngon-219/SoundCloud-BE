import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { EditCategoryDto } from '../dto/edit-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

    @Post('seed')
    @UseGuards(JwtGuard)
    @ApiBearerAuth('jwt')
    seedCategories() {
        return this.categoryService.seedCategories();
    }

    @Post('create')
    @UseGuards(JwtGuard)
    @ApiBearerAuth('jwt')
    async create(@Body() CreateCategoryDto: CreateCategoryDto) {
        const { category_name } = CreateCategoryDto;
        return this.categoryService.createCategory(category_name);
    }

    @Get('all')
    @UseGuards(JwtGuard)
    @ApiBearerAuth('jwt')
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Patch()
    @UseGuards(JwtGuard)
    @ApiBearerAuth('jwt')
    async editCategory(@Body() EditCategoryDto: EditCategoryDto) {
        const { category_id, category_name } = EditCategoryDto;
        return this.categoryService.editCategory(category_id, category_name);
    }

    @Get('song/:category_id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth('jwt')
    async getSongByCategoryId(@Param('category_id') category_id: string) {
        return this.categoryService.getSongsByCategory(category_id);
    }

}
