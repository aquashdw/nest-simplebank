import { Module } from '@nestjs/common';
import { AccountTransController } from './account-trans.controller';
import { AccountTransService } from './account-trans.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { SharesEntity } from './entities/shares.entity';
import { TransactionsEntity } from './entities/transactions.entity';
import { AccountSharesEntity } from './entities/account.shares.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3307,
      username: process.env.DB_USER || 'nest',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_DATABASE || 'sb_transactions',
      entities: [
        AccountEntity,
        SharesEntity,
        TransactionsEntity,
        AccountSharesEntity,
      ],
      autoLoadEntities: true,
      synchronize: parseInt(process.env.DB_SYNC) == 1 || false,
      insecureAuth: true,
    }),
    TypeOrmModule.forFeature([
      AccountEntity,
      SharesEntity,
      TransactionsEntity,
      AccountSharesEntity,
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'simplebank.topic',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672/',
      connectionInitOptions: {
        wait: false,
      },
    }),
  ],
  controllers: [AccountTransController],
  providers: [AccountTransService],
})
export class AccountTransModule {}
