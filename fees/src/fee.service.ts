import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';
import { OrderPlacedEvent } from '@simplebank/shared-objects/dist';

@Injectable()
export class FeeService {
  private readonly logger = new Logger(FeeService.name);
  private readonly feePerShare = [1, 2, 3];

  @RabbitSubscribe({
    exchange: 'simplebank.topic',
    routingKey: 'simplebank.market.order.placed',
    queue: `${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced(event: OrderPlacedEvent) {
    // TODO
    // const feeProd = this.feePerShare[event.shareId % 3];
    // const fee = feeProd * event.
  }
}
