import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieController } from './movie.controller';
import { MoviesService } from './movie.service';

@Module({
  controllers: [MovieController],
  providers: [MoviesService, PrismaService],
})
export class MoviesModule {}
