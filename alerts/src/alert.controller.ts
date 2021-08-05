import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller()
export class AlertController {
  private readonly logger = new Logger(AlertController.name);
  constructor(private readonly appService: AlertService) {}

  @Get('health')
  healthCheck() {
    this.logger.log('TODO health check');
  }

  @Post('alert')
  createAlert() {
    this.logger.log('TODO create alert');
  }
}
