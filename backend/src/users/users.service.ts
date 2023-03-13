import { Injectable } from '@nestjs/common';
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
    await this.checkUserExists(createUserDto.email);

    const signupVerifyToken = uuid.v1();

    createUserDto.signupVerifyToken = signupVerifyToken;

    await this.userRepository.saveUser(createUserDto);
    await this.sendMemberJoinEmail(createUserDto.email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(emailAddress);
    if (!user) throw new NotFoundError('유저가 존재하지 않습니다.');
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.userRepository.findUserByToken(signupVerifyToken);

    if (!user) throw new NotFoundError('유저가 존재하지 않습니다.');

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.authService.login({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new NotFoundError('유저가 존재하지 않습니다.');
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
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
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
