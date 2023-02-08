import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entity/user.entity';
import { UsersService } from '../user/users.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UserLoginDto } from './models/AuthRequest';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: UserLoginDto) {
    const userName = await this.usersService.findByEmail(user.email);
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      userName
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
