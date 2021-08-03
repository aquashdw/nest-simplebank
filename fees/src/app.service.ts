import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @RabbitSubscribe({
    exchange: 'temp-exchange-name',
    routingKey: 'temp.routing.key',
    queue: `${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced() {
    this.logger.log('TODO handle order placed');
  }
}
