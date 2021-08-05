import { Controller, Get, Logger, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly appService: OrderService) {}

  @Get('health')
  healthCheck() {
    this.logger.log('TODO health check');
  }

  @Post('sell-shares')
  sellShares() {
    this.logger.log('TODO sell shares');
  }
}
