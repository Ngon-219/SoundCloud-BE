import { ApiProperty } from '@nestjs/swagger';
import { IsString, isString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Pop', description: 'Tên thể loại nhạc' })
  @IsString()
  category_name: string;
}
