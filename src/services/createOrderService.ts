import { getRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import Customer from '../models/Customer';
import Product from '../models/Product';
import Order from '../models/Order';

import AppError from '../errors/appError';

interface OrderProducts {
  product_id: string;
  quantity: number;
  note: string;
}

interface Request {
  customer_id: string;
  order_products: OrderProducts[];
}

class CreateOrderService {
  public async execute({
    customer_id,
    order_products,
  }: Request): Promise<Order> {
    const customersRepository = getRepository(Customer);
    const ordersRepository = getRepository(Order);
    const productsRepository = getRepository(Product);

    const customer = await customersRepository.findOne({
      where: { id: customer_id },
    });

    if (!customer) {
      throw new AppError('customer does not exist');
    }

    const productIds = order_products.map(orderProduct => ({
      id: orderProduct.product_id,
    }));

    const foundProducts = await productsRepository.findByIds(productIds);

    if (foundProducts.length !== order_products.length) {
      throw new AppError('all products should be available on the database');
    }

    const formattedOrderProducts = order_products.map(
      (orderProduct, index) => ({
        product_id: orderProduct.product_id,
        name: foundProducts[index].name,
        price: foundProducts[index].price,
        image: foundProducts[index].image,
        quantity: orderProduct.quantity,
        note: orderProduct.note,
      }),
    );

    const order = await ordersRepository.create({
      customer_id,
      customer,
      order_products: formattedOrderProducts,
    });

    const savedOrder = await ordersRepository.save(order);

    return { ...savedOrder, customer: classToClass(savedOrder.customer) };
  }
}

export default CreateOrderService;
