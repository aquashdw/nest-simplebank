import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @Inject('nest_producer') private readonly jobQueueClient: ClientProxy,
  ) {}

  requestReservation() {
    // TODO send request to account-trans
  }

  produceOrderCreate() {
    // TODO this.jobQueueClient.emit(); produce job for market
  }

  @RabbitSubscribe({
    exchange: 'temp-exchange-name',
    routingKey: 'temp.routing.key',
    queue: `${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced() {
    // TODO handle order placed
  }
}
