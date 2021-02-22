import { Router } from 'express';
import CreateTransactionService from '../services/createTransactionService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const transactionsRouter = Router();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post('/', async (req, res) => {
  const {
    card_number,
    cvc,
    card_validation_date,
    name_on_card,
    country,
    order_id,
  } = req.body;

  const createTransactionService = new CreateTransactionService();

  const transaction = await createTransactionService.execute({
    card_number,
    cvc,
    card_validation_date,
    name_on_card,
    country,
    customer_id: req.customer.id,
    order_id,
  });

  return res.status(201).json({ transaction });
});

export default transactionsRouter;
