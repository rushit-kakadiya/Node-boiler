import { Router } from 'express';
import multer from 'multer';
import { authenticateRequest } from '../../../../middlewares/passport.middleware';
import { createEvent, listAllEvents } from '../controllers/events.controller';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });
const evetnRouter = Router();

evetnRouter.get('/', authenticateRequest, listAllEvents);
evetnRouter.post('/create', [authenticateRequest, upload.single('poster')], createEvent);

export default evetnRouter;
