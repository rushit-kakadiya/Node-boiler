import { Request, Response } from 'express';
import ErrorResponse from '../../../../types/ErrorResponse';
import ResponseWithMessage from '../../../../types/ResponseWithMessage';
import ValidationErrorResponse from '../../../../types/ValidationErrorResponse';
import Ticket from '../models/tickets.model';
import { findAllTickets, saveTicket } from '../services/tickets.service';

export const lsitAllTickets = [
  async (req: Request, res: Response<Ticket[] | ValidationErrorResponse | ErrorResponse | ResponseWithMessage>) => {
    try {
      const events: Ticket[] = await findAllTickets({});
      res.status(200).json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const createTicket = [
  async (req: Request, res: Response<ValidationErrorResponse | Ticket | ErrorResponse>) => {
    const user: Ticket = req.body;
    try {
      const savedUser: Ticket = await saveTicket(user);
      res.status(200).json(savedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  },
];
