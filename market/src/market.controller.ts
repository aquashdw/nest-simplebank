import { Controller, Get, Logger } from '@nestjs/common';
import { MarketService } from './market.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MarketController {
  private readonly logger = new Logger(MarketController.name);
  constructor(private readonly appService: MarketService) {}

  @EventPattern('order_created')
  consumeOrderCreated(dto: any) {
    // TODO
  }

  @Get('health')
  getHealthCheck() {
    // TODO
  }
}
