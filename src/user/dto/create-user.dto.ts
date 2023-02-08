import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Zac',
    description: 'Nome do usuário a ser criado',
  })
  name: string;

  @IsUrl()
  @ApiProperty({
    example: 'zac.png',
    description: 'Foto do usuário a ser criado',
  })
  img: string;


  @IsEmail()
  @ApiProperty({
    example: 'zac@mail.com',
    description: 'Email do usuário a ser criado',
  })
  email: string;


  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @ApiProperty({
    example: '@Abc1234',
    description:
      'Senha do usuário a ser criado, mínimo uma letra maiuscula, uma letra minuscula, um número e um simbolo.',
  })
  password: string;
}