import { UserInfo } from './UserInfo';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    private checkUserExists;
    getUserByEmail(email: string): Promise<UserEntity>;
    getUserInfo(userId: string): Promise<UserInfo>;
    updateUserInfo(userId: string, updateUserDto: UpdateUserDto, userInfo: UserEntity): Promise<UserInfo>;
}
