import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);

  createAlert(alertArgs: any) {
    // TODO
  }
}
