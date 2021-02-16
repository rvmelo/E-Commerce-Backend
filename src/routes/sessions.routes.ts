import { Router } from 'express';
import AuthenticateUserService from '../services/authenticateCustomerService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUserService = new AuthenticateUserService();

  const { customer, token } = await authenticateUserService.execute({
    email,
    password,
  });

  return res.status(201).json({ customer, token });
});

export default sessionsRouter;
