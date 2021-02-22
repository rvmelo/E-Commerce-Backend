import { getRepository } from 'typeorm';
import Product from '../models/Product';

import AppError from '../errors/appError';

interface Request {
  name: string;
  price: number;
  image: string;
}

class CreateProductService {
  public async execute({ name, price, image }: Request): Promise<Product> {
    const productsRepository = await getRepository(Product);

    const productExists = await productsRepository.findOne({ where: { name } });

    if (productExists) {
      throw new AppError('product already exists');
    }

    const product = productsRepository.create({
      name,
      price,
      image,
    });

    const savedProduct = await productsRepository.save(product);

    return savedProduct;
  }
}

export default CreateProductService;
