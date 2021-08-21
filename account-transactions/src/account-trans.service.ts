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
import { AccountSharesEntity } from './entities/account.shares.entity';

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
    @InjectRepository(AccountSharesEntity)
    private accountSharesRepository: Repository<AccountSharesEntity>,
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
    routingKey: 'simplebank.market.order.placed',
    queue: `account-trans-${randomUUID()}`,
    queueOptions: {
      autoDelete: true,
    },
  })
  async subscribeOrderPlaced(event: OrderPlacedEvent) {
    const transaction = await this.transactionsRepository
      .findOneOrFail({
        requestId: event.requestId,
      })
      .catch((reason) => {
        this.logger.error(reason);
        this.logger.error(
          `data inconsistency: cannot find request id: ${event.requestId}`,
        );
        throw new NotFoundException('');
      });
    transaction.status = event.status;

    if (event.status == 'success') {
      const account = transaction.account;
      const shares = transaction.shares;
      account.balance -= transaction.diff * shares.price;
      const accountShares = await this.accountSharesRepository.findOne({
        account: account,
        shares: shares,
      });
      if (accountShares == undefined) {
        await this.accountSharesRepository.insert({
          account: account,
          shares: shares,
          count: transaction.diff,
        });
      } else {
        accountShares.count -= transaction.diff;
        await this.accountSharesRepository.save(accountShares);
      }
    }
    await this.transactionsRepository.save(transaction);
  }

  executeTransaction(transactionArgs: any) {
    // TODO actual database update
  }
}
