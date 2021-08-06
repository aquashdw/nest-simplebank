import { Controller, Get, Logger, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('request-reservation')
  postRequestReservation(dto: any) {
    return this.gatewayService.relayRequestReservation(dto);
  }

  @Post('sell-shares')
  postSellShares() {
    return this.gatewayService.relaySellShares();
  }

  @Post('alert')
  postCreateAlert() {
    return this.gatewayService.relayCreateAlert();
  }

  @Get('health')
  healthCheck() {
    // TODO
  }
}
