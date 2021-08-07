import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  GateResponseDto,
  OrderPlacedEvent,
  RequestReservationDto,
} from '@simplebank/shared-objects/dist';

@Injectable()
export class AccountTransService {
  private readonly logger = new Logger(AccountTransService.name);

  reserveTransaction(dto: RequestReservationDto): GateResponseDto {
    // TODO
    return null;
  }

  @RabbitSubscribe({
    exchange: 'temp-exchange-name',
    routingKey: 'temp.routing.key',
    queue: `${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced(event: OrderPlacedEvent) {
    // TODO run execute transaction
  }

  executeTransaction(transactionArgs: any) {
    // TODO actual database update
  }
}
