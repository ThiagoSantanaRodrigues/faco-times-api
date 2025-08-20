import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { cors } from '@common/constants/cors';
import { HttpExceptionFilter } from '@common/middlewares/exception.middleware';
import { ValidationPipe } from '@nestjs/common';
import { Kernel } from './app/kernel';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(cors);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(Kernel.validationPipeConfig));
  await new Kernel(app).boot();
}
bootstrap();
