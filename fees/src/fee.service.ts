import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';
import {
  FeeOccurrenceEvent,
  OrderPlacedEvent,
} from '@simplebank/shared-objects/dist';

@Injectable()
export class FeeService {
  private readonly logger = new Logger(FeeService.name);
  private readonly feePerShare = [1, 2, 3];
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'simplebank.topic',
    routingKey: 'simplebank.market.order.placed',
    queue: `fees-market-${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  async subscribeOrderPlaced(eventOrder: OrderPlacedEvent) {
    const feeRate = this.feePerShare[eventOrder.shareId % 3];
    const fee = (feeRate * eventOrder.sellCount) / 10;
    const eventFee = new FeeOccurrenceEvent();
    eventFee.requestId = eventOrder.requestId;
    eventFee.accountId = eventOrder.accountId;
    eventFee.log = `fee for event: ${eventOrder.requestId}, share ${eventOrder.shareId}, rate: ${feeRate}, total: ${fee}`;
    eventFee.amount = fee;

    await this.amqpConnection.publish(
      'simplebank.topic',
      'simplebank.fee.created',
      JSON.stringify(eventFee),
    );
  }
}
