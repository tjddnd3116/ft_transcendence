import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from 'src/users/user.repository';
import { WsJwtStrategy } from './ws-jwt.strategy';
import { WsAuthGuard } from './ws-auth.guard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    WsJwtStrategy,
    WsAuthGuard,
  ],
  exports: [
    AuthService,
    UserRepository,
    PassportModule,
    JwtModule,
    WsAuthGuard,
  ],
})
export class AuthModule {}
