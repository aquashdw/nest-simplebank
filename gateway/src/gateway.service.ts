import { Injectable, Logger } from '@nestjs/common';
import {
  CreateAlertDto,
  GateResponseDto,
  SellSharesDto,
} from '@simplebank/shared-objects/dist';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger();
  constructor(private httpService: HttpService) {}

  async relaySellShares(dto: SellSharesDto): Promise<GateResponseDto> {
    const httpResponse = await lastValueFrom(
      this.httpService.post('some_url_to_orders', dto),
    );
    const responseStatus = httpResponse.status;
    // TODO switch case for responseStatus
    const responseBody = httpResponse.data;

    return responseBody;
  }

  async relayCreateAlert(dto: CreateAlertDto): Promise<GateResponseDto> {
    const httpResponse = await lastValueFrom(
      this.httpService.post('some_url_to_alerts', dto),
    );
    const responseBody = new GateResponseDto();
    responseBody.status = 'success';
    responseBody.message = 'success';

    return responseBody;
  }
}
