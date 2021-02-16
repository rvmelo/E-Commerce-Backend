import { Router } from 'express';
import ListProductsService from '../services/listProductsService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.get('/', async (_, res) => {
  const listProductsService = new ListProductsService();

  const products = await listProductsService.execute();

  res.status(200).json({ products });
});

export default productsRouter;
