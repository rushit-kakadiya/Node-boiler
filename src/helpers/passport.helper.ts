import passport from 'passport';
import passportJwt from 'passport-jwt';
import User from '../api/v1/users/models/users.model';
import UsersSchema from '../api/v1/users/schemas/users.schema';

import { JWT_SECRET } from '../util/Const';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || JWT_SECRET,
    },
    function (jwtToken, done) {
      UsersSchema.findOne({ email: jwtToken.email }, function (err: Error, user: User) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(undefined, user, jwtToken);
        } else {
          return done(undefined, false);
        }
      });
    },
  ),
);
