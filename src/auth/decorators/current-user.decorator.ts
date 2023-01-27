import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserLoginDto } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<UserLoginDto>();

    return request.user;
  },
);
