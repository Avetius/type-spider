import { Auth }        from '../../models/auth/auth.model';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt }  from 'passport-jwt';
import { secret }      from '../../../../commonjs/configs/secret';

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromHeader('access');
opts.secretOrKey = secret;
/*opts.issuer = "";  //accounts.examplesoft.com
 opts.audience = "localhost:8088"; //home-spider.herokuapp.com*/
opts.ignoreExpiration = true;

export default new JwtStrategy(opts, (payload, done) => {
        console.log('passport.use payload -> ', payload);
        Auth.findById(payload).then(auth => {
            console.log('passport jwt credential -> ',credential);
            if (credential) {
                done(null, credential);
            } else {
                done(null, false);
            }
        }).catch(err => {
            return done(err, false);
        });
    })
