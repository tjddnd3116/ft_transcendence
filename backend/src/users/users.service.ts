import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { NotFoundError } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,

    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.userRepository.saveUser(
      email,
      name,
      password,
      signupVerifyToken,
    );
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(emailAddress);
    if (user) throw new Error('이미 같은 이메일을 사용중입니다.');
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  // TODO: email 인증 하기 전 로그인 차단 기능 추가
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.userRepository.findUserByToken(signupVerifyToken);

    if (!user) throw new NotFoundError('유저가 존재하지 않습니다.');

    user.isVerified = true;

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    if (user.isVerified === false) {
      throw new UnauthorizedException('email 인증이 필요합니다.');
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.authService.login({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundError('유저가 존재하지 않습니다.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async updateUserInfo(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInfo> {
    const { password, avatarImageUrl } = updateUserDto;
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundError('유저가 존재하지 않습니다.');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.avatarImageUrl = avatarImageUrl;
    await this.userRepository.save(user);

    return await this.getUserInfo(userId);
  }
}
