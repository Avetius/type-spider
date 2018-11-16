import User from '../models/user.model';
import UserFilter from '../filters/user.filter';
import IUser from '../interfaces/user.interface';

export class UserController {
  async getAll(input: Partial<UserFilter>) { 
    return await User.find(input, IUser).exec();
  }

  async getOne(input: Partial<UserFilter>) {
    return await User.findOne(input, IUser).exec();
  }
  
  async create(input: Partial<UserFilter>) {
    return await new User(input).save((err) => { return err;});
  }
  
  async update(input) {
    return await {result: 'Users.update'};
  }
  
  async delete(input) {
    return await {result: 'Users.delete'};
  }

  async signup(input) {
    return await User.findOne({ 'email' :  input.email }, async (err, user) => {
      if (err) return {err, user:null}; //done(err);
      if (user) return {err:'That email is already taken.', user:null};
      return await User.create({ email: input.email, password: input.password });
    });    
  }

  async login(input) {
    //Find the user associated with the email provided by the user
    const user = await User.findOne({ email: input.email });
    if( !user ) return {err: null, user: null};
    const validate = await user.schema.methods.isValidPassword(input.password);
    if( !validate ) return {err: null, user: false};
    //Send the user information to the next middleware
    return {err: null, user};
  }

  async loginJWT(input:number) {
    return User.findById(input).then(user => {
      console.log('passport jwt user-> ',user);
      if (user) return {err:null, user};
      return {err:null, user:false};
    }).catch(err => {
      return {err, user:false};
    });
  }

  async loginFB(input) {
    const {profile, token} = input;
    // find the user in the database based on their facebook id
    return User.findOne({'facebook.id' : profile.id})
    .then(user => {
      // if the user is found, then log them in
      if (user) return {err:null, user};
      const newUser = new User({
        facebook: {
          id    : profile.id, // set the users facebook id
          token : token, // we will save the token that facebook provides to the user
          name  : profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
          email : profile.emails[0].value // facebook can return multiple emails so we'll take the first
        }
      });
      User.create(newUser)
        .then(user => { return {err:null, user}; })
        .catch(err => { 
          console.log('err -> ', err);
          return {err, user:null}; 
        });
    }).catch(err => {
      return {
        message: 'Sign up failed',
        err: true,
        status: 401,
        user: null
      };
    });
  }
  async loginGoogle(input) {
    const {profile, token} = input;
    return User.findOne({ 'googleId': profile.id })
    .then(user => { 
      if (user) return {err:null, user};
      const newUser = new User({
        google: {
          id    : profile.id,
          token : token,
          name  : profile.displayName,
          email : profile.emails[0].value // pull the first email
        }
      });
      // save the user
      User.create(newUser)
        .then(user => { return {err:null, user}; })
        .catch(err => { throw err; });
    }).catch(err => {
      return {
        message: 'Sign up failed',
        err: true,
        status: 401,
        user: null
      };
    });
  }

  async deserializeUser(input) {
    const id = input.id;
    return await User.findById(id)
    .then(user => {
      return {err: null, user};
    })
    .catch(err =>{
      console.log(err);
      return {err, user: null};
    });
  }
}
