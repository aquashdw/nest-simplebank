import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller()
export class AlertController {
  private readonly logger = new Logger(AlertController.name);
  constructor(private readonly appService: AlertService) {}

  @Get('health')
  getHealthCheck() {
    // TODO
  }

  @Post('alert')
  postCreateAlert() {
    // TODO
  }
}
