import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @RabbitSubscribe({
    exchange: 'temp-exchange',
    routingKey: '',
    queue: `fanout-${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced() {
    this.logger.log('TODO event order placed');
  }
}
