const configAuth = {

  facebookAuth : {
    clientID      : '2720270008198946', // your App ID
    clientSecret  : 'fd27755b378eb4ab00c99947b7e60d9e', // your App Secret
    callbackURL   : 'https://cybernate.am/user/auth/facebook/callback'
  },

  twitterAuth : {
    consumerKey     : 'your-consumer-key-here',
    consumerSecret  : 'your-client-secret-here',
    callbackURL     : 'http://localhost:8080/auth/twitter/callback'
  },

  googleAuth : {
    clientID      : 'your-secret-clientID-here',
    clientSecret  : 'your-client-secret-here',
    callbackURL   : 'http://localhost:8080/auth/google/callback'
  }

};

export default configAuth;
