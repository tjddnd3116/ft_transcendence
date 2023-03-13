import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ description: '로그인 email' })
  email: string;
  @ApiProperty({ description: '로그인 password' })
  password: string;
}
