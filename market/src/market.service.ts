import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishOrderPlaced(dto: any) {
    // TODO await this.amqpConnection.publish('nest.topic.exchange', routingKey, JSON.stringify(dto));
  }
}
