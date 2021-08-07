import { Controller, Get, Logger, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {
  CreateAlertDto,
  GateResponseDto,
  SellSharesDto,
} from '@simplebank/shared-objects/dist';

@Controller()
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('sell-shares')
  postSellShares(dto: SellSharesDto): GateResponseDto {
    return this.gatewayService.relaySellShares(dto);
  }

  @Post('alert')
  postCreateAlert(dto: CreateAlertDto): GateResponseDto {
    return this.gatewayService.relayCreateAlert(dto);
  }

  @Get('health')
  healthCheck() {
    // TODO
  }
}
