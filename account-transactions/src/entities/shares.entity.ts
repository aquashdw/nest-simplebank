import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shares' })
export class SharesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
