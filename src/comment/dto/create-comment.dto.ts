import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
      @ApiProperty({
        description: 'ID của bài hát bị báo cáo',
        example: 'a1b2c3d4e5f6g7h8i9',
      })
      song_id: string;
    
      @ApiProperty({
        description: 'Nội dung báo cáo',
        example: 'Bài hát có nội dung vi phạm bản quyền',
      })
      content: string;
}
