// src/routes/index.ts
import { Router } from 'express';
import customersRouter from './customers.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
