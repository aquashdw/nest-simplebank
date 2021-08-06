import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger();

  relayRequestReservation(dto: any) {
    // TODO
  }

  relaySellShares() {
    // TODO
  }

  relayCreateAlert() {
    // TODO
  }
}
