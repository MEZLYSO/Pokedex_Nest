import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Implementacion de Pipes de validacion
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  // Permite agregar un prefijo antes de los endpoints
  app.setGlobalPrefix('api/v2')

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App runing in ${process.env.PORT}`)
}
bootstrap();
