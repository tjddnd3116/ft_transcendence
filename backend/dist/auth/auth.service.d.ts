import { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/authConfig';
import { JwtService } from '@nestjs/jwt';
interface User {
    id: string;
    name: string;
    email: string;
}
export declare class AuthService {
    private config;
    private jwtService;
    constructor(config: ConfigType<typeof authConfig>, jwtService: JwtService);
    login(user: User): string;
}
export {};
