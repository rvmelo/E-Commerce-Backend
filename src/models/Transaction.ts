import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';

import Customer from './Customer';
import Order from './Order';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_number: string;

  @Column()
  cvc: string;

  @Column()
  card_validation_date: string;

  @Column()
  name_on_card: string;

  @Column()
  country: string;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  order_id: string;

  @OneToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
