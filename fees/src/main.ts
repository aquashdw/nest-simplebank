import { NestFactory } from '@nestjs/core';
import { FeeModule } from './fee.module';

async function bootstrap() {
  const app = await NestFactory.create(FeeModule);
  await app.listen(3000);
}
bootstrap();
