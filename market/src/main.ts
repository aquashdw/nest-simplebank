import { NestFactory } from '@nestjs/core';
import { MarketModule } from './market.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MarketModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672/'],
      queue: 'simplebank.jobs.place-order',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen(3004);
}
bootstrap();
