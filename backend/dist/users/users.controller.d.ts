import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfo } from './UserInfo';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    getUserInfo(userId: string): Promise<UserInfo>;
    updateUserInfo(userId: string, updateUserDto: UpdateUserDto, userInfo: UserEntity): Promise<UserInfo>;
}
