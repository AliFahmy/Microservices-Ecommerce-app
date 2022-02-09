import express, { Request, Response, Router } from 'express';
import {
  NotFoundError,
  validateRequest,
  requireAuth,
} from '@ticketsmarche/common';
import { Ticket } from '../models/ticket';
const router = Router();

router.get(
  '/api/tickets/:id',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    res.status(200).send(ticket);
  }
);

export { router as getTicket };
