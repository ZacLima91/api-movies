import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [UsersModule, MoviesModule, PrismaModule],
})
export class AppModule {}
