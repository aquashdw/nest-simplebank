import { Injectable, Logger } from '@nestjs/common';
import {
  CreateAlertDto,
  GateResponseDto,
  SellSharesDto,
} from '@simplebank/shared-objects/dist';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger();

  relaySellShares(dto: SellSharesDto): GateResponseDto {
    // TODO send sales to orders service
    return null;
  }

  relayCreateAlert(dto: CreateAlertDto): GateResponseDto {
    // TODO send alert request to alert service
    return null;
  }
}
