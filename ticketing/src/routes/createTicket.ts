import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth } from '@ticketsmarche/common';
import { Ticket } from '../models/ticket';
const router = Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Ticket Title is Required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Ticket Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
