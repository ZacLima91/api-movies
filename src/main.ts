import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('API_FILMES')
    .setDescription('API responsavel pela gestão de catalogo de filmes')
    .setVersion('1.0.0')
    .addTag('users')
    .addTag('status')
    .addTag('movies')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
