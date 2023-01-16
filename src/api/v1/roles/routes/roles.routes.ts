import { Router } from 'express';
import { createRole } from '../controllers/roles.controller';

const roleRouter = Router();

roleRouter.post('/create', createRole);

export default roleRouter;
