import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateTransactionService from '../services/createTransactionService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const transactionsRouter = Router();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      card_number: Joi.string().trim().min(16).required(),
      cvc: Joi.string().trim().length(3).required(),
      card_validation_date: Joi.string().trim().length(5).required(),
      name_on_card: Joi.string().trim().min(3),
      country: Joi.string().trim().min(3),
      order_id: Joi.string().uuid().required(),
    },
  }),
  async (req, res) => {
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
  },
);

export default transactionsRouter;
