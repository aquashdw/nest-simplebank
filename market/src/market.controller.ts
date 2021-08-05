import { Controller, Get, Logger } from '@nestjs/common';
import { MarketService } from './market.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MarketController {
  private readonly logger = new Logger(MarketController.name);
  constructor(private readonly appService: MarketService) {}

  @Get('health')
  healthCheck() {
    this.logger.log('TODO health check');
  }

  @EventPattern('order_created')
  consumeOrderCreated() {
    this.logger.log('TODO send order to market');
  }
}
