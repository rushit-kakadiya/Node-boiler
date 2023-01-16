import { model, Schema } from 'mongoose';
import Ticket from '../models/tickets.model';

const tickets = new Schema<Ticket>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'events' },
  },
  {
    timestamps: true,
  },
);

const TicketsSchema = model('tickets', tickets);

export default TicketsSchema;
