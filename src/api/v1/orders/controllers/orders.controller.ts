import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getPayloadFromAccessToken } from '../../../../helpers/jwt.helper';
import logger from '../../../../helpers/logger.helper';
import ErrorResponse from '../../../../types/ErrorResponse';
import ResponseWithMessage from '../../../../types/ResponseWithMessage';
import ValidationErrorResponse from '../../../../types/ValidationErrorResponse';
import { findAllTickets, saveTicket } from '../../tickets/services/tickets.service';
import Order from '../models/orders.model';
import { findAllOrders, saveOrder } from '../services/orders.service';

export const listAllOrders = [
  async (req: Request, res: Response<Order[] | ValidationErrorResponse | ErrorResponse | ResponseWithMessage>) => {
    try {
      const user: any = getPayloadFromAccessToken(req.headers.authorization?.split(' ')[1] || '');
      const order: Order[] = await findAllOrders({ owner: new mongoose.Types.ObjectId(user._id) });
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const createOrder = [
  async (req: Request, res: Response<Order | ValidationErrorResponse | ErrorResponse | ResponseWithMessage>) => {
    try {
      const user: any = getPayloadFromAccessToken(req.headers.authorization?.split(' ')[1] || '');
      const { tickets, quantity } = req.body;
      const ticket: any = await findAllTickets({ _id: new mongoose.Types.ObjectId(tickets) });
      const updatedTicket = ticket[0];
      logger.info(updatedTicket.event);
      if (new Date(updatedTicket.event.endDate) > new Date()) {
        if (updatedTicket.quantity >= quantity) {
          const order: Order = {
            owner: user._id,
            tickets: tickets,
            date: new Date(),
            quantity: quantity,
            totalPrice: updatedTicket.price * quantity,
          };
          const savedDoc: Order = await saveOrder(order);
          updatedTicket.quantity = updatedTicket.quantity - quantity;
          await saveTicket(updatedTicket);
          res.status(200).json(savedDoc);
        }
      } else {
        res.status(200).json({ message: 'Event is finished' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
];
