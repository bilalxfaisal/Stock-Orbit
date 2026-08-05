import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT) || 8080;

  await app.listen(port, '0.0.0.0');

  console.log('PORT env =', process.env.PORT);
  console.log('Address =', app.getHttpServer().address());
}

bootstrap();