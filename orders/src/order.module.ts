import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'nest_producer',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/'],
          queue: 'simplebank.jobs.place-order',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
