import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AccountTransService {
  private readonly logger = new Logger(AccountTransService.name);

  reserveTransaction(transactionArgs: any) {
    // TODO
  }

  @RabbitSubscribe({
    exchange: 'temp-exchange-name',
    routingKey: 'temp.routing.key',
    queue: `${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced(eventMessage: any) {
    // TODO
  }

  executeTransaction(transactionArgs: any) {
    // TODO
  }
}
