import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  OrderCreatedJob,
  OrderPlacedEvent,
} from '@simplebank/shared-objects/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPlacedEntity } from './entities/order.placed.entity';
import { Repository } from 'typeorm';
import { OrderPlacedDto } from './dto/order.placed.dto';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectRepository(OrderPlacedEntity)
    private orderPlacedRepository: Repository<OrderPlacedEntity>,
  ) {}

  // 4.
  async placeOrderToMarket(job: OrderCreatedJob) {
    const newOrder = this.orderPlacedRepository.create();
    newOrder.requestId = job.requestId;
    newOrder.shareId = job.shareId;
    newOrder.accountId = job.accountId;
    newOrder.sellCount = job.sellCount;
    await this.orderPlacedRepository.save(newOrder);
  }

  // 6.
  async publishOrderPlaced(dto: OrderPlacedDto) {
    const recordEntity = await this.orderPlacedRepository
      .findOneOrFail({
        requestId: dto.requestId,
      })
      .catch((reason) => {
        this.logger.error(reason.toString());
        throw new NotFoundException(
          `order with id: ${dto.requestId} not found`,
        );
      });

    const event = new OrderPlacedEvent();
    event.requestId = dto.requestId;
    event.shareId = recordEntity.shareId;
    event.accountId = recordEntity.accountId;
    event.sellCount = recordEntity.sellCount;
    event.status = dto.status;
    event.message = dto.message;

    await this.amqpConnection.publish(
      'simplebank.topic',
      'simplebank.market.order.placed',
      JSON.stringify(event),
    );
  }
}
