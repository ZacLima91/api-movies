import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MovieController } from './movie.controller';
import { MoviesService } from './movie.service';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MoviesService],
})
export class MoviesModule {}
