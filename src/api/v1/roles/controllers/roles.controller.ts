import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ValidationErrorResponse from '../../../../types/ValidationErrorResponse';
import Role from '../models/roles.model';
import { saveRole } from '../services/role.service';

export const createRole = [
  body('name').not().isEmpty().withMessage('Required'),
  body('permissionKeys').not().isEmpty().withMessage('Required'),
  body('description').not().isEmpty().withMessage('Required'),
  async (req: Request, res: Response<Role | ValidationErrorResponse>) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const role: Role = req.body;
    const savedRole: Role = await saveRole(role);
    res.status(200).json(savedRole);
  },
];
