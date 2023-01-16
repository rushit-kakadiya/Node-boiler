import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import User from '../models/users.model';
import { findAllUsers, saveUser } from '../services/users.service';
import ValidationErrorResponse from '../../../../types/ValidationErrorResponse';
import ErrorResponse from '../../../../types/ErrorResponse';
import UsersSchema from '../schemas/users.schema';
import { generateAccessToken } from '../../../../helpers/jwt.helper';

export const listAllUsers = [
  async (req: Request, res: Response<User[]>) => {
    const users: User[] = await findAllUsers({ fname: 'Super' });
    res.json(users);
  },
];

export const createUser = [
  body('fname').not().isEmpty().withMessage('Required'),
  body('lname').not().isEmpty().withMessage('Required'),
  body('email').not().isEmpty().isEmail().withMessage('Required valid email'),
  body('password').not().isEmpty().withMessage('Required'),
  body('roleKey').not().isEmpty().withMessage('Required'),
  async (req: Request, res: Response<ValidationErrorResponse | User | ErrorResponse>) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const user: User = req.body;
    try {
      const savedUser: User = await saveUser(user);
      res.status(200).json(savedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  },
];

export const login = [
  (req: Request, res: Response) => {
    const { email, password } = req.body;
    UsersSchema.findOne({ email: email }, (error: Error, user: any) => {
      if (error) {
        return res.status(500).json(error);
      }
      if (!user) {
        return res.status(404).json({ message: `Email ${email} not found` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return res.status(500).json(error);
        }
        if (isMatch) {
          const payload = { ...user._doc };
          delete payload.password;
          const token = generateAccessToken(payload);
          return res.status(200).json({ ...payload, access_token: token });
        }
        return res.status(401).json({ status: 'error', code: 'unauthorized', message: 'Wrong password' });
      });
    });
  },
];
