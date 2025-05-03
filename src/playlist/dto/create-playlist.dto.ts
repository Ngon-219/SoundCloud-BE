import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaylistDto {
    @ApiProperty({
        type: "string",
        description: "Tên playlist",
    })
    name: string;

    @ApiProperty({
        type: "string",
        description: "Mô tả playlist",
    })
    is_public: boolean;

    @ApiProperty({
        type: "string",
        description: "ID người dùng tạo playlist",
    })
    song_id: string[];
}
