import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { SharesEntity } from './shares.entity';

@Entity({ name: 'transactions' })
export class TransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestId: string;

  @ManyToOne(() => AccountEntity, (accountEntity) => accountEntity.id)
  account: AccountEntity;

  @ManyToOne(() => SharesEntity, (sharesEntity) => sharesEntity.id)
  shares: SharesEntity;

  @Column()
  diff: number;

  @Column()
  status: string;
}
