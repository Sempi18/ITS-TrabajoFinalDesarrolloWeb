import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.info(`Gateway escuchando desde el puerto: ${envs.PORT}`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true }));
  await app.listen(envs.PORT);
}
bootstrap();
