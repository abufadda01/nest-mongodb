import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe()) // to enable global pipe validation with this one we trigger all DTOS classes to check its validation cases for all incomming data
  await app.listen(3001);
}
bootstrap();
