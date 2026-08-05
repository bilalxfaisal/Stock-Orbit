import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: [
			'http://localhost:6063',
			'https://stockorbit.vercel.app',
		],
		credentials: true,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Stock Management API')
		.setDescription('API Documentation')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, document);

	const port = process.env.PORT || 6006;

	await app.listen(port, "0.0.0.0");

	console.log(`Server is listening on ${port}`);
}

bootstrap();


