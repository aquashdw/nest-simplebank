import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  GateResponseDto,
  OrderPlacedEvent,
  RequestReservationDto,
} from '@simplebank/shared-objects/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { SharesEntity } from './entities/shares.entity';

@Injectable()
export class AccountTransService {
  private readonly logger = new Logger(AccountTransService.name);
  constructor(
    @InjectRepository(TransactionsEntity)
    private transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(SharesEntity)
    private sharesRepository: Repository<SharesEntity>,
  ) {}

  async reserveTransaction(
    dto: RequestReservationDto,
  ): Promise<GateResponseDto> {
    this.logger.debug(JSON.stringify(dto));
    const accountEntity = await this.accountRepository
      .findOneOrFail(dto.accountId)
      .catch((reason) => {
        this.logger.warn(reason);
        throw new NotFoundException(
          `account with id: ${dto.accountId} not found`,
        );
      });
    const sharesEntity = await this.sharesRepository.findOne(dto.shareId);
    await this.transactionsRepository.insert({
      requestId: dto.requestId,
      account: accountEntity,
      shares: sharesEntity,
      diff: dto.sellCount,
      status: 'pending',
    });
    return {
      status: 'sucees',
      message: 'transaction pending',
    };
  }

  @RabbitSubscribe({
    exchange: 'simplebank.topic',
    routingKey: 'simplebank.market.#',
    queue: `account-trans-${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  subscribeOrderPlaced(event: OrderPlacedEvent) {
    // TODO run execute transaction
  }

  executeTransaction(transactionArgs: any) {
    // TODO actual database update
  }
}
