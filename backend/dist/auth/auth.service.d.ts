import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
interface User {
    name: string;
    email: string;
}
export declare class AuthService {
    private config;
    private jwtService;
    private usersService;
    constructor(config: ConfigType<typeof authConfig>, jwtService: JwtService, usersService: UsersService);
    createJwt(user: User): string;
    login(email: string, password: string): Promise<string>;
    isVerifiedToken(socket: Socket): any;
}
export {};
