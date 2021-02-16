import { Router } from 'express';
import CreateCustomerService from '../services/createCustomerService';

const customersRouter = Router();

customersRouter.post('/', async (req, res) => {
  const createCustomerService = new CreateCustomerService();

  const { name, email, password } = req.body;

  const customer = await createCustomerService.execute({
    name,
    email,
    password,
  });

  return res.status(201).json(customer);
});

export default customersRouter;
