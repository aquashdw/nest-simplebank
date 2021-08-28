import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { MarketService } from './market.service';
import { EventPattern } from '@nestjs/microservices';
import { OrderCreatedJob } from '@simplebank/shared-objects/dist';
import { OrderPlacedDto } from './dto/order.placed.dto';

@Controller()
export class MarketController {
  private readonly logger = new Logger(MarketController.name);
  constructor(private readonly appService: MarketService) {}

  @EventPattern('order_created')
  consumeOrderCreated(job: OrderCreatedJob) {
    this.appService.placeOrderToMarket(job);
  }

  @Post('order-result')
  postOrderResult(@Body() dto: OrderPlacedDto) {
    this.appService.publishOrderPlaced(dto);
  }

  @Get('health')
  getHealthCheck() {
    return 'Market Service Homepage';
  }
}
