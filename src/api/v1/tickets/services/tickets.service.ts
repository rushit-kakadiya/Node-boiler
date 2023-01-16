import Ticket from '../models/tickets.model';
import TicketsSchema from '../schemas/tickets.schema';

export const findAllTickets = async (filters: {}) => {
  try {
    const tickets: Ticket[] = await TicketsSchema.aggregate([
      { $match: filters },
      {
        $lookup: {
          from: 'events',
          localField: 'eventId',
          foreignField: '_id',
          as: 'event',
        },
      },
    ]).exec();
    return tickets;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveTicket = async (ticket: Ticket) => {
  try {
    const ticketModel = new TicketsSchema<Ticket>({ ...ticket });
    const savedDoc = await ticketModel.save();
    return savedDoc;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const findOneTicket = async (filter: {}) => {
  try {
    const ticket = await TicketsSchema.findById(filter).exec();
    return ticket;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
