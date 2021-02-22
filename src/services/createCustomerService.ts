import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import { classToClass } from 'class-transformer';
import Customer from '../models/Customer';
import AppError from '../errors/appError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  public async execute({ name, email, password }: Request): Promise<Customer> {
    const customerRepository = getRepository(Customer);

    const checkCustomerExists = await customerRepository.findOne({
      where: { email },
    });

    if (checkCustomerExists) {
      throw new AppError('Customer already exists');
    }

    const hashedPassword = await hash(password, 8);

    const customer = customerRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await customerRepository.save(customer);

    return classToClass(customer);
  }
}

export default CreateCustomerService;
