import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'temp-exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672/',
      connectionInitOptions: {
        wait: false,
      },
    }),
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
