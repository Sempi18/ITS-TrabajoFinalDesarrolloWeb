import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Logger en vez de console.info para mejor práctica
  const logger = new Logger('Bootstrap');
  logger.log(`Gateway escuchando en el puerto: ${envs.PORT}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // lanza error si hay propiedades extras
      transform: true, // convierte tipos automáticamente
    }),
  );

  await app.listen(envs.PORT);
}
bootstrap();
