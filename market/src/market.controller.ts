import { Controller, Get, Logger, Post } from '@nestjs/common';
import { MarketService } from './market.service';
import { EventPattern } from '@nestjs/microservices';
import {
  OrderCreatedJob,
  OrderPlacedEvent,
} from '@simplebank/shared-objects/dist';

@Controller()
export class MarketController {
  private readonly logger = new Logger(MarketController.name);
  constructor(private readonly appService: MarketService) {}

  @EventPattern('order_created')
  consumeOrderCreated(job: OrderCreatedJob) {
    this.appService.placeOrderToMarket(job);
  }

  @Post('order-result')
  postOrderResult(event: OrderPlacedEvent) {
    this.appService.publishOrderPlaced(event);
  }

  @Get('health')
  getHealthCheck() {
    return 'Market Service Homepage';
  }
}
