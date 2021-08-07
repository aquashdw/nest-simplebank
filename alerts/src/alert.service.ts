import { Injectable, Logger } from '@nestjs/common';
import {
  CreateAlertDto,
  GateResponseDto,
} from '@simplebank/shared-objects/dist';

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);

  createAlert(dto: CreateAlertDto): GateResponseDto {
    // TODO mock send alert to devices
    return null;
  }
}
