import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../models/user.model';
import { USER_REPOSITORY } from '../services/user.service';

export const JWT_STRATEGY = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async function (jwtPayload, cb) {
    try {
      console.log(jwtPayload);
      const user = await USER_REPOSITORY.findByPk(jwtPayload.email);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
);
passport.use(JWT_STRATEGY);
