import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AlertService } from './alert.service';
import {
  CreateAlertDto,
  GateResponseDto,
} from '@simplebank/shared-objects/dist';

@Controller()
export class AlertController {
  private readonly logger = new Logger(AlertController.name);
  constructor(private readonly appService: AlertService) {}

  @Get('health')
  getHealthCheck() {
    // TODO
  }

  @Post('alert')
  postCreateAlert(dto: CreateAlertDto): GateResponseDto {
    return this.appService.createAlert(dto);
  }
}
