import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors({
    origin:['http://example.com',"https://example.com", "http://localhost, https://api-movies-g3b3tyk6o-zaclima91.vercel.app/movies"],
    allowedHeaders:['Content-Type, Accept', 'Authorization'],
    
  }));

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
