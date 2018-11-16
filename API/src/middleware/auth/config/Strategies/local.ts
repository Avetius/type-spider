import { Broker } from "../../../../../../CommonJS/src/broker/broker";
import { Strategy as LocalStrategy } from 'passport-local';

const broker = new Broker();

export const signup = new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, async (email, password, done) => {
    try{
      const result = await broker.send('users', {header:'signup', body:{email, password}});
      done(result.err, result.user)
    } catch (error) {
      done(error);
    }
});

export const login = new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    const result = await broker.send('users', {header:'login', body:{email, password}});
    const user = result.user;
    if ( result.err ) done(result.err);
    if ( !user ) return done(null, false, { message : 'Email or password not found'});
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
});
