// import db from '../../../db';
import bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email:  String,
  password: String,
  
  facebook : {
    id : String,
    token : String,
    name : String,
    email : String,
  },
  twitter : {
    id : String,
    token : String,
    displayName : String,
    username : String,
  },
  google : {
    id : String,
    token : String,
    email : String,
    name : String,
  },

  privileges: String,
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.pre('save', async function(next){
  //'this' refers to the current document about to be saved
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  console.log('this -> -> -> ',this);
  const hash = await bcrypt.hash(this.schema.obj.password, 10);
  //Replace the plain text password with the hash and then store it
  this.schema.obj.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the 
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const User = mongoose.model('User', UserSchema);

export default User;
