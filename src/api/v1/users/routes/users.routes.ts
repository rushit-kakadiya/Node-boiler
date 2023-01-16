import { Router } from 'express';
import { authenticateRequest } from '../../../../middlewares/passport.middleware';
import { createUser, listAllUsers, login } from '../controllers/users.controller';

const userRouter = Router();

userRouter.get('/', authenticateRequest, listAllUsers);
userRouter.post('/signup', createUser);
userRouter.post('/login', login);

export default userRouter;
