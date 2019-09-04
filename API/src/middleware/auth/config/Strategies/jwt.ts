import broker from "../../../../../../CommonJS/src/broker/broker";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import secretKey from '../secret.js';


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
  try {
    console.log('passport.use payload -> ', payload);
    const result = await broker.send('users', {header:'loginJWT', body:{payload}});
    const { err, user } = result; 
    if (err) done(err, false);
    if (user) done(null, user);
    if (!user) done(null, false);
  } catch (e) {
    console.error(e);
    done(e, false);
  } 
})

export default jwtStrategy;
