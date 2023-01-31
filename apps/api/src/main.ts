import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.use(cookieParser());
  const config = await app.get(ConfigService);
  const port = config.get('PORT');

  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
