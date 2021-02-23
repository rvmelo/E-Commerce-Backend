import { getRepository } from 'typeorm';
import Order from '../models/Order';
import Transaction from '../models/Transaction';

import AppError from '../errors/appError';

interface Request {
  card_number: string;
  cvc: string;
  card_validation_date: string;
  name_on_card: string;
  country: string;
  customer_id: string;
  order_id: string;
}

class CreateTransactionService {
  public async execute({
    card_number,
    cvc,
    card_validation_date,
    name_on_card,
    country,
    customer_id,
    order_id,
  }: Request): Promise<Transaction> {
    const ordersRepository = getRepository(Order);
    const transactionsRepository = getRepository(Transaction);

    const order = await ordersRepository.findOne({ where: { id: order_id } });

    if (!order || order.customer_id !== customer_id) {
      throw new AppError('Order not found for authenticated customer');
    }

    const value = order.order_products.reduce((totalValue, orderProduct) => {
      totalValue += orderProduct.quantity * orderProduct.price;
      return totalValue;
    }, 0);

    const createdTransaction = transactionsRepository.create({
      card_number,
      cvc,
      card_validation_date,
      name_on_card,
      country,
      customer_id,
      order_id,
      value,
    });

    const savedTransaction = await transactionsRepository.save(
      createdTransaction,
    );

    return savedTransaction;
  }
}

export default CreateTransactionService;
