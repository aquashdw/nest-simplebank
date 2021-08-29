import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountBalanceLogEntity } from './account.balance.log.entity';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @OneToMany(() => AccountBalanceLogEntity, (balanceLog) => balanceLog.id)
  logs: AccountBalanceLogEntity[];
}
