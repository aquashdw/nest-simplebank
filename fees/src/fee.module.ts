import { Module } from '@nestjs/common';
import { FeeController } from './fee.controller';
import { FeeService } from './fee.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'simplebank.topic',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672/',
      connectionInitOptions: {
        wait: false,
      },
    }),
  ],
  controllers: [FeeController],
  providers: [FeeService],
})
export class FeeModule {}
