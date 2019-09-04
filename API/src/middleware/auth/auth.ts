import * as passport from 'passport';
import Facebook from './config/Strategies/facebook';
import Google from './config/Strategies/google';
import jwt from './config/Strategies/jwt';
import { signup, login } from './config/Strategies/local';


passport.use('signup', signup);
passport.use('login', login);
passport.use('jwt', jwt);
passport.use('facebook',Facebook);
passport.use('google',Google);

// middleware for doing role-based permissions
export function permit(...allowed) {
  const isAllowed = (role) => { return allowed.indexOf(role) > -1; };
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      next();
    } else { res.status(403).json({ message: 'Forbidden' }); }
  };
}
