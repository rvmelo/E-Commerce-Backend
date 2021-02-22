import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CreateCustomerService from '../services/createCustomerService';

const customersRouter = Router();

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().min(3).required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(3).required(),
    },
  }),
  async (req, res) => {
    const createCustomerService = new CreateCustomerService();

    const { name, email, password } = req.body;

    const customer = await createCustomerService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(customer);
  },
);

export default customersRouter;
