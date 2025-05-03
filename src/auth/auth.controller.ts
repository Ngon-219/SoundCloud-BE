import { Controller } from '@nestjs/common';
import { Body, Get } from '@nestjs/common/decorators';
import { Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('sign-in')
    signIn(@Body() data: SignInDto): any {
        return this. authService.signIn(data);
    }
}
