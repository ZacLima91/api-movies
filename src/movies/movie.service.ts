import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

const handleConstrainUniqueError = (error: Error): never => {
  const splitedMessage = error.message.split('`');

  const errorMessage = `Entrada '${
    splitedMessage[splitedMessage.length - 2]
  }' não está respeitando a constraint UNIQUE`;
  throw new UnprocessableEntityException(errorMessage);
};

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMovieDto): Promise<Movie | void> {
    return await this.prisma.movie
      .create({ data: dto })
      .catch(handleConstrainUniqueError);
  }

  findAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  async verifyIdAndReturnUser(id: string): Promise<Movie> {
    const movie: Movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return movie;
  }

  findOne(id: string): Promise<Movie> {
    return this.verifyIdAndReturnUser(id);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie | void> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.movie
      .update({ where: { id }, data: dto })
      .catch(handleConstrainUniqueError);
  }

  async remove(id: string): Promise<Movie> {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.movie.delete({ where: { id } });
  }
}
