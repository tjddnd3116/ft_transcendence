import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as ulid from 'ulid';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, name, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ email, name, password: hasedPassword });

    await this.save(user);
  }
  async findUserByEmail(emailAddress: string): Promise<UserEntity> {
    return await this.findOne({
      where: { email: emailAddress },
    });
  }

  async findUserByToken(signupVerifyToken: string): Promise<UserEntity> {
    return await this.findOne({
      where: { signupVerifyToken },
    });
  }

  async findUserById(userId: string): Promise<UserEntity> {
    return await this.findOne({
      where: { id: userId },
    });
  }

  async saveUser(createUserDto: CreateUserDto): Promise<void> {
    const user = new UserEntity();

    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    user.id = ulid.ulid();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.avatarImageUrl = 'default.img';
    user.registrationDate = new Date();
    await this.save(user);
    return;
  }
}
