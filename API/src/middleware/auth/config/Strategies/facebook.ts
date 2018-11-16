import { Broker } from "../../../../../../CommonJS/src/broker/broker";
import { Strategy as FacebookStrategy } from 'passport-facebook';
import configAuth from '../soc.network.settings';

const broker = new Broker();

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
const facebookStrategy = new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID      : configAuth.facebookAuth.clientID,
    clientSecret  : configAuth.facebookAuth.clientSecret,
    callbackURL   : configAuth.facebookAuth.callbackURL
  },
  // facebook will send back the token and profile
  async (token, refreshToken, profile, done) => {
    const result = await broker.send('users', {header:'loginFB', body:{profile, token, refreshToken}});
    const { err, user } = result;
    done(err, user); 
  });

  export default facebookStrategy;
