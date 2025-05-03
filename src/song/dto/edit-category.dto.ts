import { ApiProperty } from '@nestjs/swagger';
import { IsString, isString } from 'class-validator';

export class EditCategoryDto {
    @ApiProperty({ example: '447f0690-037c-4758-914f-ecee611057ce', description: 'Id thể loại nhạc' })
    @IsString()
    category_id: string;

    @ApiProperty({ example: 'Pop', description: 'Tên thể loại nhạc' })
    @IsString()
    category_name: string;
}
