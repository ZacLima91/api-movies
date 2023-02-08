import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updated-user.dto';

const handleConstrainUniqueError = (error: Error): never => {
  const splitedMessage = error.message.split('`');

  const errorMessage = `Entrada '${
    splitedMessage[splitedMessage.length - 2]
  }' não está respeitando a constraint UNIQUE`;
  throw new UnprocessableEntityException(errorMessage);
};

@Injectable()
export class UsersService {

  private userSelect = {
    id: true,
    userName: true,
    email: true,
    img: true,
    updatedAt: true,
    createdAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User | undefined> {
    const hashedPassword = await bcrypt.hash(dto.password, 8);
    const data: CreateUserDto = {
      userName: dto.userName,
      email: dto.email,
      img: dto.img,
      password: hashedPassword,
    };
    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleConstrainUniqueError);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: { ...this.userSelect },
    });
  }

  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        userName: true,
        img:true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return user;
  }

  findOne(id: string) {
    return this.verifyIdAndReturnUser(id);
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.user
      .update({ where: { id }, data: dto, select: this.userSelect })
      .catch(handleConstrainUniqueError);
  }

  async remove(id: string): Promise<User> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.user.delete({ where: { id }, select: this.userSelect });
  }
}
