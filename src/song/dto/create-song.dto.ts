import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsOptional, ArrayNotEmpty } from 'class-validator';
import { Express } from 'express';

export class CreateSongDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    description: 'Danh sách các ID thể loại',
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  category_id: string[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    description: 'Danh sách các tệp đã tải lên',
  })
  @IsOptional()
  files?: Express.Multer.File[];
}
