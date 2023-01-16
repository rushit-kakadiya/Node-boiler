import { Router } from 'express';
import { authenticateRequest } from '../../../../middlewares/passport.middleware';
import { createTicket, lsitAllTickets } from '../controllers/tickets.controllers';

const ticketsRouter = Router();

ticketsRouter.get('/', authenticateRequest, lsitAllTickets);
ticketsRouter.post('/create', authenticateRequest, createTicket);

export default ticketsRouter;
