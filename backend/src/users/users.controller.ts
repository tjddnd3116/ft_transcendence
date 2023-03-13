import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User API')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiBody({
    type: CreateUserDto,
  })
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '채팅방 생성 API',
    description: '채팅방을 생성한다.',
  })
  @Post('/email-verify')
  @ApiOperation({
    summary: '유저 email 인증 API',
    description: '회원가입한 유저의 email 주소로 인증 메일을 발송한다.',
  })
  @ApiBody({ type: VerifyEmailDto })
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  @ApiOperation({
    summary: '유저 로그인 API',
    description: '유저 email, password로 로그인한다.',
  })
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  @ApiOperation({
    summary: '유저 정보 API',
    description: '유저의 정보를 얻는다.',
  })
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @Patch(':id/status')
  @ApiOperation({
    summary: '유저 정보 업데이트 API',
    description: '유저의 정보(password, img)를 업데이트한다.',
  })
  async updateUserInfo(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserInfo> {
    return this.usersService.updateUserInfo(userId, updateUserDto);
  }
}
