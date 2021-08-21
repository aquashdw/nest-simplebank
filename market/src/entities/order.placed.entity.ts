import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'order_placed',
})
export class OrderPlacedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestId: string;

  @Column()
  accountId: number;

  @Column()
  shareId: number;

  @Column()
  sellCount: number;
}
