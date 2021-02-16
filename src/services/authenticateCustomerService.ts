import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import Customer from '../models/Customer';
import authConfig from '../config/auth';
import AppError from '../errors/appError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  customer: Customer;
}

class AuthenticateCustomerService {
  public async execute({ email, password }: Request): Promise<Response> {
    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({ where: { email } });

    if (!customer) {
      throw new AppError(' wrong user/password combinations');
    }

    const passwordMatched = await compare(password, customer.password);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    if (!passwordMatched) {
      throw new AppError(' wrong user/password combination');
    }

    return { customer, token };
  }
}

export default AuthenticateCustomerService;
