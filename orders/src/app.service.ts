import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject('nest_producer') private readonly jobQueueClient: ClientProxy,
  ) {}

  requestReservation() {
    this.logger.log(
      'TODO send request-reservaton request -> account-transactions',
    );
  }

  produceOrderCreate() {
    this.logger.log('TODO create order_created job');
    // TODO this.jobQueueClient.emit();
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
    this.logger.log('TODO handle order placed');
  }
}
