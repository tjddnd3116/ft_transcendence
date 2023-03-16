import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
  ) {}

  login(user: User) {
    const payload = { ...user };

    return this.jwtService.sign(payload);
  }

  isVerifiedToken(socket: Socket): boolean {
    const auth = socket.handshake.headers.authorization;
    const token = auth.split(' ')[1];
    console.log(token);
    const payload = this.jwtService.verify(token);
    console.log(payload);
    if (!payload) {
      return false;
    }
    return true;
  }
}
