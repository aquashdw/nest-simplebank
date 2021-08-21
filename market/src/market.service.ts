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

  // 4.
  placeOrderToMarket(job: OrderCreatedJob) {
    // TODO simulate order created
    // thread.sleep(5); 5.
    // this.publishOrderPlaced({
    //   requestId: job.requestId,
    //   status: 200,
    //   message: "success";
    // });
  }

  // 6.
  async publishOrderPlaced(event: OrderPlacedEvent) {
    await this.amqpConnection.publish(
      'simplebank.topic',
      'simplebank.market.order.placed',
      JSON.stringify(event),
    );
  }
}
