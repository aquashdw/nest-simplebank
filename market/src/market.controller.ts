import { Controller, Get, Logger } from '@nestjs/common';
import { MarketService } from './market.service';
import { EventPattern } from '@nestjs/microservices';
import { OrderCreatedJob } from '@simplebank/shared-objects/dist';

@Controller()
export class MarketController {
  private readonly logger = new Logger(MarketController.name);
  constructor(private readonly appService: MarketService) {}

  @EventPattern('order_created')
  consumeOrderCreated(job: OrderCreatedJob) {
    this.appService.placeOrderToMarket(job);
  }

  @Get('health')
  getHealthCheck() {
    // TODO
  }
}
