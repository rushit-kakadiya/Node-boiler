import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import '../helpers/passport.helper';

export const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', function (err, user) {
    if (err) {
      console.log(err);
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    }
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      return next();
    }
  })(req, res, next);
};
