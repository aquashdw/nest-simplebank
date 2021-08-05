import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AccountTransService } from './account-trans.service';

@Controller()
export class AccountTransController {
  private readonly logger = new Logger(AccountTransController.name);
  constructor(private readonly appService: AccountTransService) {}

  @Get('health')
  healthCheck() {
    this.logger.log('TODO health check');
  }

  @Post('request-reservation')
  requestReservation() {
    this.logger.log('TODO request reservation');
  }
}
