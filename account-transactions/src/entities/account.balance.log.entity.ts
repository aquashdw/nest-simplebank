import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'balance_log' })
export class AccountBalanceLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  log: string;

  @Column()
  amount: number;

  @ManyToOne(() => AccountEntity, (accountEntity) => accountEntity.id)
  account: AccountEntity;
}
