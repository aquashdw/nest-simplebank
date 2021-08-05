import { Module } from '@nestjs/common';
import { AccountTransController } from './account-trans.controller';
import { AccountTransService } from './account-trans.service';

@Module({
  imports: [],
  controllers: [AccountTransController],
  providers: [AccountTransService],
})
export class AccountTransModule {}
