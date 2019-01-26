import { Broker } from "../../../../CommonJS/src/broker/broker";
import * as passport from 'passport';
import Facebook from './config/Strategies/facebook';
import Google from './config/Strategies/google';
import jwt from './config/Strategies/jwt';
import { signup, login } from './config/Strategies/local';

const broker = new Broker();

passport.use('signup', signup);
passport.use('login', login);
passport.use('jwt', jwt);
passport.use('facebook',Facebook);
passport.use('google',Google);

export const isUser = (req, res, next) => {
  /*passport.authenticate('jwt', { session: false});*/
  console.log("Checking Authentication...");
  /*console.log("req.user -> ", req.user);*/
  if(req.user){
    next();
  }else{
    res.send('Unauthorized');
  }
};

export const isAdmin = (req, res, next) => {
  /*passport.authenticate('jwt', { session: false});*/
  console.log("Checking privileges...");
  console.log("req.user.privil -> "+req.user.privil);
  if((req.user.privil === 'admin') || (req.user.privil === 'owner')){
    console.log('req.user.privileges -> ', req.user.privileges);
    next();
  }else{
    console.log('Permission Denied');
    res.send('Permission Denied');
  }
};

export const isOwner = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
	console.log("Checking privileges...");
    /*console.log("req.user -> "+req.user);*/
	if(req.user.privileges === 'owner'){
		console.log('req.user.privileges -> ', req.user.privileges);
		next();
	}else{
		console.log('Permission Denied');
		res.send('Permission Denied');
	}
};

export const isLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
};

// used to serialize the user for the session
passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
  const result = await broker.send('users', {header:'deserializeUser', body:{id}});
    const { user } = result;
    if (user) done(user); 
});
