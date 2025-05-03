import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../interface/payload-jwt.interface';
import { UserRepository } from '@/repositories/userRepository';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly usersService: UserRepository,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// ignoreExpiration: true,
			secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET || configService.get('JWT_ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: AccessTokenPayload) {
		return await this.usersService.findOne({email: payload.email});
	}
}
