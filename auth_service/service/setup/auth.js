//todo add passport strategies for facebook google and tweeter

'use strict';

import { passport } from 'passport';
import { User     } from '../models/auth/auth.model.js';
import { Facebook } from '../configs/Strategies/facebook';
import { Google   } from '../configs/Strategies/google';
import { jwt      } from '../configs/Strategies/jwt';

passport.use('jwt', jwt);
passport.use('facebook',Facebook);
passport.use('google',Google);

passport.isUser = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
    console.log("Checking Authentication...");
    /*console.log("req.user -> ", req.user);*/
    if(req.user){
        next();
    }else{
        res.send('Unauthorized');
    }
};

passport.isAdmin = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
    console.log("Checking privileges...");
    console.log("req.user.privil -> "+req.user.privil);
    if((req.user.privil === 'admin') || (req.user.privil === 'owner')){
        console.log('req.user.privileges -> ', req.user.privileges);
        next();
    }else{
        console.log('Permission Denied');
        res.send('Permission Denied')
    }
};

passport.isOwner = (req, res, next) => {
    /*passport.authenticate('jwt', { session: false});*/
	console.log("Checking privileges...");
    /*console.log("req.user -> "+req.user);*/
	if(req.user.privileges === 'owner'){
		console.log('req.user.privileges -> ', req.user.privileges);
		next();
	}else{
		console.log('Permission Denied');
		res.send('Permission Denied')
	}
};

passport.isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(user);
        })
        .catch(err =>{
            console.log(err);
        });
});

export const passport;
export const isUser     = passport.isUser;
export const isAdmin    = passport.isAdmin;
export const isOwner    = passport.isOwner;
export const isLoggedIn = passport.isLoggedIn;
