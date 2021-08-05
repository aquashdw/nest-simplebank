import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly appService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
