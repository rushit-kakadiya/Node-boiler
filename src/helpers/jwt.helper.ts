import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/Const';
import jwt_decode from 'jwt-decode';

export const generateAccessToken = (payload: {}) => {
  return jwt.sign(payload, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: '1y' });
};

export const getPayloadFromAccessToken = (token: string) => {
  let decoded = jwt_decode(token);
  return decoded;
};
