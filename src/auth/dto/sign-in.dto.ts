import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString, IsUrl, isURL } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'ngon' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ example: 'email' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'avatar' })
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    avatar: string;
}