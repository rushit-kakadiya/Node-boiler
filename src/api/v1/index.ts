import { Router } from 'express';
import ResponseWithMessage from '../../types/ResponseWithMessage';
import evetnRouter from './events/routes/events.routes';
import orderRouter from './orders/routes/orders.routes';
import roleRouter from './roles/routes/roles.routes';
import ticketsRouter from './tickets/routes/tickets.routes';
import userRouter from './users/routes/users.routes';

const v1 = Router();

v1.get<{}, ResponseWithMessage>('/', (req, res) => {
  res.json({ message: 'v1 apis are up.' });
});

v1.use('/users', userRouter);
v1.use('/roles', roleRouter);
v1.use('/events', evetnRouter);
v1.use('/tickets', ticketsRouter);
v1.use('/orders', orderRouter);

export default v1;
