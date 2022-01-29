import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeConnection } from './db/CreateConnection';

async function bootstrap() {
  await initializeConnection();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
