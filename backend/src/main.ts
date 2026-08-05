// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
// 	const app = await NestFactory.create(AppModule)

// 	app.enableCors({
// 		origin: "http://localhost:6063",
// 		credentials: true,
// 	});

// 	app.useGlobalPipes(
// 		new ValidationPipe({
// 			whitelist: true,
// 			transform: true,
// 		}),
// 	);

// 	const config = new DocumentBuilder()
// 		.setTitle('Stock Management API')
// 		.setDescription('API Documentation')
// 		.setVersion('1.0')
// 		.addBearerAuth()
// 		.build();

// 	const document = SwaggerModule.createDocument(app, config);

// 	SwaggerModule.setup('api', app, document);

// 	const port = process.env.PORT || 6006;

// 	await app.listen(port, "0.0.0.0");

// 	console.log(`Server is listening on ${port}`);
// }

// bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const port = Number(process.env.PORT) || 6006;

//   await app.listen(port, '0.0.0.0');

//   console.log('PORT env =', process.env.PORT);
//   console.log('Address =', app.getHttpServer().address());
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import http from 'node:http';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = Number(process.env.PORT);

  if (!port) {
    throw new Error('PORT is not defined');
  }

  await app.listen(port, '0.0.0.0');

  console.log(`Listening on 0.0.0.0:${port}`);

  http.get(`http://127.0.0.1:${port}/`, (res) => {
    console.log('SELF TEST STATUS:', res.statusCode);

    res.on('data', (chunk) => {
      console.log('SELF TEST BODY:', chunk.toString());
    });
  }).on('error', (err) => {
    console.error('SELF TEST FAILED:', err);
  });
}

bootstrap();