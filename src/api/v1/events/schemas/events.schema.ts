import { model, Schema } from 'mongoose';
import Events from '../models/events.model';

const events = new Schema<Events>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    endDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    slug: { type: String, required: true, unique: true },
    poster: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const EventsSchema = model('events', events);

export default EventsSchema;
