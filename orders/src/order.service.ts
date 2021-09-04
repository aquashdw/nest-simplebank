import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { randomUUID } from 'crypto';
import {
  GateResponseDto,
  SellSharesDto,
} from '@simplebank/shared-objects/dist';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @Inject('nest_producer')
    private readonly jobQueueClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  async sellShares(dto: SellSharesDto): Promise<GateResponseDto> {
    const requestId = randomUUID().toString();
    const orderResponse = new GateResponseDto();
    const reserveResponse = await this.requestReservation(dto, requestId);
    if (reserveResponse.status != 'success') {
      orderResponse.status = reserveResponse.status;
      orderResponse.message = `[from=account-transactions] ${reserveResponse.message}`;

      return orderResponse;
    }
    this.produceOrderCreate(dto, requestId);
    // TODO
    return orderResponse;
  }

  async requestReservation(
    dto: SellSharesDto,
    requestId: string,
  ): Promise<GateResponseDto> {
    return (
      await lastValueFrom(
        this.httpService.post('some_url_to_at', {
          requestId: `req-sell-${requestId}`,
          accountId: dto.accountId,
          shareId: dto.shareId,
          sellCount: dto.sellCount,
        }),
      )
    ).data;
  }

  produceOrderCreate(dto: SellSharesDto, requestId: string) {
    // TODO this.jobQueueClient.emit(); produce job for market
  }

  @RabbitSubscribe({
    exchange: 'simplebank.topic',
    routingKey: 'simplebank.market.order.placed',
    queue: `orders-market-${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced() {
    // TODO send request to alert service
  }
}
