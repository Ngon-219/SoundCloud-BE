import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeSongDto {
    @ApiProperty(
        {
            description: '用户ID',
            example: '1234567890abcdef12345678',
        }
    )
    songId: string
}
