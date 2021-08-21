import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPlacedEntity } from './entities/order.placed.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3307,
      username: process.env.DB_USER || 'nest',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_DATABASE || 'sb_market',
      entities: [OrderPlacedEntity],
      autoLoadEntities: true,
      synchronize: parseInt(process.env.DB_SYNC) == 1 || false,
      insecureAuth: true,
    }),
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
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
