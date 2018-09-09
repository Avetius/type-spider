'use strict';

import { Auth }       from '../../models/auth/auth.model';
import { passport }   from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { configAuth } from '../auth';

// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
export default new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                // find the credential in the database based on their facebook id
                Auth.findOne({
                    where: {
                        'facebookId' : profile.id
                    }
                }).then(credential => {
                    // if the credential is found, then log them in
                    if (credential) {
                        return done(null, credential); // credential found, return that credential
                    } else {
                        // if there is no credential found with that facebook id, create them
                        let newCredential  = Auth.build({
                            facebookID    : profile.id, // set the credentials facebook id
                            facebookToken : profile.token, // we will save the token that facebook provides to the user
                            facebookName  : profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
                            facebookEmail : profile.emails[0].value // facebook can return multiple emails so we'll take the first
                        });
                        // set all of the facebook information in our credential model

                        // save our credential to the database
                        Auth.create(newCredential)
                            .then(credential => {
                                return done(null, credential);
                            })
                            .catch(err => {
                                throw err;
                            });
                            // if successful, return the new credential
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
