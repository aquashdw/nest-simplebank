import { Module } from '@nestjs/common';
import { AccountTransController } from './account-trans.controller';
import { AccountTransService } from './account-trans.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'temp-exchange',
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
