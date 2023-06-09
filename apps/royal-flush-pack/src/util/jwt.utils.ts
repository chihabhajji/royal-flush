import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_REPOSITORY } from '../services/user.service';

export const JWT_STRATEGY = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async function (jwtPayload, cb) {
    try {
      console.log(jwtPayload)
      if(!jwtPayload.email) return cb(new Error('Not authorized!'), false);
      const user = await USER_REPOSITORY.findByPk(jwtPayload.email);
      if(!user) return cb(new Error('Chtaamel linna inta!'), false);
      console.log(user.email);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
);
passport.use(JWT_STRATEGY);
