import { Router } from 'express';
import customersRouter from './customers.routes';
import sessionsRouter from './sessions.routes';
import productsRouter from './products.routes';
import ordersRouter from './order.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);

export default routes;
