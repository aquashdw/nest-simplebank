import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  OrderCreatedJob,
  OrderPlacedEvent,
} from '@simplebank/shared-objects/dist';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}

  placeOrderToMarket(job: OrderCreatedJob) {
    // TODO
  }

  async publishOrderPlaced(event: OrderPlacedEvent) {
    // TODO await this.amqpConnection.publish('nest.topic.exchange', routingKey, JSON.stringify(dto));
  }
}
