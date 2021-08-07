import { Controller, Get, Logger, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  GateResponseDto,
  SellSharesDto,
} from '@simplebank/shared-objects/dist';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly appService: OrderService) {}

  @Post('sell-shares')
  postSellShares(dto: SellSharesDto): GateResponseDto {
    return this.appService.sellShares(dto);
  }

  @Get('health')
  healthCheck() {
    // TODO
  }
}
