import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Socket } from 'socket.io';
export declare class UsersService {
    private emailService;
    private authService;
    private userRepository;
    constructor(emailService: EmailService, authService: AuthService, userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    private checkUserExists;
    private sendMemberJoinEmail;
    verifyEmail(signupVerifyToken: string): Promise<string>;
    login(email: string, password: string): Promise<object>;
    getUserBySocket(socket: Socket): Promise<UserEntity>;
    getUserInfo(userId: string): Promise<UserInfo>;
    updateUserInfo(userId: string, updateUserDto: UpdateUserDto, userInfo: UserEntity): Promise<UserInfo>;
}
