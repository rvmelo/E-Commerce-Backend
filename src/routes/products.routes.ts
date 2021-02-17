import { Router } from 'express';

import ListProductsService from '../services/listProductsService';
import CreateProductService from '../services/createProductService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', async (req, res) => {
  const { name, price, image } = req.body;

  const createProductService = new CreateProductService();

  const product = await createProductService.execute({ name, price, image });

  return res.status(201).json({ product });
});

productsRouter.get('/', async (_, res) => {
  const listProductsService = new ListProductsService();

  const products = await listProductsService.execute();

  res.status(200).json({ products });
});

export default productsRouter;
