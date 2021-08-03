import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  healthCheck() {
    this.logger.log('TODO health check');
  }

  @Post('/request-reservation')
  requestReservation() {
    this.logger.log('TODO request reservation');
  }
}
