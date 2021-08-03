import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHello() {
    this.logger.log('TODO health check');
  }

  @EventPattern('order_created')
  handleJob() {
    this.logger.log('TODO send order to market');
  }
}
