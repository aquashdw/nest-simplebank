import { Controller, Get, Logger, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name);
  constructor(private readonly appService: GatewayService) {}

  @Post('request-reservation')
  postRequestReservation(dto: any) {
    // TODO
  }

  @Post('sell-shares')
  sellShares() {
    // TODO
  }

  @Post('alert')
  postCreateAlert() {
    // TODO
  }

  @Get('health')
  healthCheck() {
    // TODO
  }
}
