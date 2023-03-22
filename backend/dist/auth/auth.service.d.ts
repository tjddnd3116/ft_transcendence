import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
interface User {
    name: string;
    email: string;
}
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    createJwt(user: User): string;
    login(email: string, password: string): Promise<string>;
    isVerifiedToken(socket: Socket): any;
}
export {};
