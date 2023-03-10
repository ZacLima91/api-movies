import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movie.service';
import { Movie } from './entity/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Criação de filmes',
  })
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }
  
  @IsPublic()
  @Get()
  @ApiOperation({
    summary: 'Listagem de filmes',
  })
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({
    summary: 'Listagem de um filme',
  })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualização de um filme',
  })
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Exclusão de um filme',
  })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
