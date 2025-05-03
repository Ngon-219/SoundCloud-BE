
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@/repositories/userRepository';
import { SignInDto } from './dto/sign-in.dto';
import { User, UserRole } from '@/user/entities/user.entity';
import { UserStatus } from '@/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto): Promise<any> {
    const existingUser = await this.userRepository.findOne({email: data.email});
    console.log("existingUser", existingUser);

    if (!existingUser) {
      const newUser = await this.userRepository.create({
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        follower_count: 0,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
      });
      await this.userRepository.save(newUser);
      console.log("User not found, creating new user ", newUser);
    }

    const payload = { email: data.email };
    console.log("payload", payload);
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
