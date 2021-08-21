import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AccountTransService } from './account-trans.service';
import {
  GateResponseDto,
  RequestReservationDto,
} from '@simplebank/shared-objects/dist';

@Controller()
export class AccountTransController {
  private readonly logger = new Logger(AccountTransController.name);
  constructor(private readonly appService: AccountTransService) {}

  @Get('health')
  getHealthCheck() {
    return 'account transaction homepage';
  }

  @Post('request-reservation')
  async postRequestReservation(
    dto: RequestReservationDto,
  ): Promise<GateResponseDto> {
    return this.appService.reserveTransaction(dto);
  }
}
