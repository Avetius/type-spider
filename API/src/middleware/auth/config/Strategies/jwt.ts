import { Broker } from "../../../../../../CommonJS/src/broker/broker";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import secretKey from '../secret.js';

const broker = new Broker();

interface Iopts {
  jwtFromRequest,
  secretOrKey:string,
  ignoreExpiration:boolean,
  // issuer:string,
  // audience:string,
}

const opts:Iopts = {
  jwtFromRequest: ExtractJwt.fromHeader('access'),
  secretOrKey: secretKey,
  // issuer: 'cybernate.am',  //accounts.examplesoft.com
  // audience: 'cybernate.am', //home-spider.herokuapp.com
  ignoreExpiration: true,
};

const jwtStrategy = new JwtStrategy(opts, async(payload, done) => {
  console.log('passport.use payload -> ', payload);
  const result = await broker.send('users', {header:'loginJWT', body:{payload}});
  const { err, user } = result;
  done(err, user); 
})

export default jwtStrategy;
