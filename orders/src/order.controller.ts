import { Controller, Get, Logger, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly appService: OrderService) {}

  @Get('health')
  healthCheck() {
    // TODO
  }

  @Post('sell-shares')
  postSellShares(dto: any) {
    // TODO
  }
}
