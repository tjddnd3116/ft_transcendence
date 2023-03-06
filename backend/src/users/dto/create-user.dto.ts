import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateUserDto {
  @Transform((params) => params.value.trim())
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @Transform(({ value, obj }) => {
    if (obj.password.includes(obj.name.trim())) {
      throw new BadRequestException(
        'password는 name과 같은 문자열을 포함할 수 없습니다.',
      );
    }
    return value.trim();
  })
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
