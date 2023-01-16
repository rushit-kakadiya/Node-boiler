import { Request, Response } from 'express';
import logger from '../../../../helpers/logger.helper';
import ErrorResponse from '../../../../types/ErrorResponse';
import ResponseWithMessage from '../../../../types/ResponseWithMessage';
import ValidationErrorResponse from '../../../../types/ValidationErrorResponse';
import Events from '../models/events.model';
import { findAllEvents, saveEvents } from '../services/events.service';

export const listAllEvents = [
  async (req: Request, res: Response<Events[] | ValidationErrorResponse | ErrorResponse | ResponseWithMessage>) => {
    try {
      const events: Events[] = await findAllEvents();
      res.status(200).json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const createEvent = [
  async (req: Request, res: Response<Events | ValidationErrorResponse | ResponseWithMessage | ErrorResponse>) => {
    try {
      logger.info(req.body);
      logger.info(req.file);
      const event: Events = req.body;
      event.poster = req?.file?.filename || '';
      const savedDoc: Events = await saveEvents(event);
      res.status(200).json(savedDoc);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
];
