import Events from '../models/events.model';
import EventsSchema from '../schemas/events.schema';

export const saveEvents = async (event: Events) => {
  try {
    const eventModel = new EventsSchema<Events>({ ...event });
    const savedDoc = await eventModel.save();
    return savedDoc;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const findAllEvents = async () => {
  try {
    const evetns: Events[] = await EventsSchema.find({}).exec();
    return evetns;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
