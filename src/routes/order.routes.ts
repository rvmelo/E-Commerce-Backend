import { Router } from 'express';
import CreateOrderService from '../services/createOrderService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ordersRouter = Router();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post('/', async (req, res) => {
  const { order_products } = req.body;

  const createOrderService = new CreateOrderService();

  const order = await createOrderService.execute({
    customer_id: req.customer.id,
    order_products,
  });

  return res.status(201).json(order);
});

export default ordersRouter;
