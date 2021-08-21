import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { SharesEntity } from './shares.entity';

@Entity({ name: 'account_shares' })
export class AccountSharesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (accountEntity) => accountEntity.id)
  account: AccountEntity;

  @ManyToOne(() => SharesEntity, (sharesEntity) => sharesEntity.id)
  shares: SharesEntity;

  @Column()
  count: number;
}
