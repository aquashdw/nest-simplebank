import { NestFactory } from '@nestjs/core';
import { AccountTransModule } from './account-trans.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountTransModule);
  await app.listen(3000);
}
bootstrap();
