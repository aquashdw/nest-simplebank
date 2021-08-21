import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;
}
