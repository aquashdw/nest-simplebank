import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';
import {
  GateResponseDto,
  SellSharesDto,
} from '@simplebank/shared-objects/dist';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @Inject('nest_producer') private readonly jobQueueClient: ClientProxy,
  ) {}

  sellShares(dto: SellSharesDto): GateResponseDto {
    const requestId = randomUUID().toString();
    this.requestReservation(dto, requestId);
    this.produceOrderCreate(dto, requestId);
    // TODO
    return null;
  }

  requestReservation(dto: SellSharesDto, requestId: string) {
    // TODO send request to account-trans
  }

  produceOrderCreate(dto: SellSharesDto, requestId: string) {
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
