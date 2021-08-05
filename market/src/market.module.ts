import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';

@Module({
  imports: [],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
