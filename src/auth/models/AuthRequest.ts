import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class UserLoginDto {

  
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
  id: string;
  name: string;
  user: User;
}