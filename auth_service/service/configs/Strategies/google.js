'use strict';

import { Auth }       from '../../models/auth/auth.model';
import { passport }   from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { configAuth } from '../auth';

export default new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // Auth.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // try to find the credential based on their google id
            Auth.findOne({
                where: {
                    'googleId': profile.id
                }
            }).then(credential => {
                if (credential) {
                    // if a user is found, log them in
                    return done(null, credential);
                } else {
                    // if the user isnt in our database, create a new credential
                    let newCredential = Auth.build({
                        googleId    : profile.id,
                        googleToken : token,
                        googleName  : profile.displayName,
                        googleEmail : profile.emails[0].value // pull the first email
                    });
                    // save the user
                    Auth.create(newCredential)
                        .then(credential => {
                            return done(null, newUser);
                        })
                        .catch(err => {
                            throw err;
                        });
                }
            }).catch(err => {
                return done({
                    message: 'Sign up failed',
                    err: true,
                    status: 401,
                    credential: null
                });
            });
        });
    });