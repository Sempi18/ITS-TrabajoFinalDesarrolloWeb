import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // lanza error si hay propiedades extras
      transform: true, // convierte tipos automáticamente
    }),
  );

  await app.listen(envs.PORT);
  const logger = new Logger('Main');
  logger.log(`Gateway escuchando en el puerto: ${envs.PORT}`);
}
bootstrap();
