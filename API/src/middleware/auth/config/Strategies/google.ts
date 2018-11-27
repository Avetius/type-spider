import { Broker } from "../../../../../../CommonJS/src/broker/broker";
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import configAuth from '../soc.network.settings';

const broker = new Broker();

const googleStrategy = new GoogleStrategy({
  clientID      : configAuth.googleAuth.clientID,
  clientSecret  : configAuth.googleAuth.clientSecret,
  callbackURL   : configAuth.googleAuth.callbackURL,
},

async (token, refreshToken, profile, done) => {
  const result = await broker.send('users', {header:'loginGoogle', body:{profile, token, refreshToken}});
    const { err, user } = result;
    done(err, user); 
});

export default googleStrategy;