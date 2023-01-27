import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: "zac@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example:"@Abc1234"
  })
  @IsString()
  password: string;
}
