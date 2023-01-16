import { Router } from 'express';
import { authenticateRequest } from '../../../../middlewares/passport.middleware';
import { createOrder, listAllOrders } from '../controllers/orders.controller';

const orderRouter = Router();

orderRouter.get('/', authenticateRequest, listAllOrders);
orderRouter.post('/create', authenticateRequest, createOrder);

export default orderRouter;
