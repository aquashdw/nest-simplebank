import { Controller, Get, Logger } from '@nestjs/common';
import { FeeService } from './fee.service';

@Controller()
export class FeeController {
  private readonly logger = new Logger(FeeController.name);
  constructor(private readonly appService: FeeService) {}

  @Get('/health')
  getHealthCheck() {
    // TODO
  }
}
