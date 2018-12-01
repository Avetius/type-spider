// import db from '../../../db';
import bcrypt from 'bcrypt-nodejs';
import { knex } from '../../../db';
import IUser from '../interfaces/user.interface';

const User = knex('users');

User.create = function(user:IUser){
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
  User.insert(user);
}

User.update = function(id:number, user:IUser){
  if(user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
  User.where({ id })
  .update(user);
}



// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   email:  String,
//   password: String,
  
//   facebook : {
//     id : String,
//     token : String,
//     name : String,
//     email : String,
//   },
//   twitter : {
//     id : String,
//     token : String,
//     displayName : String,
//     username : String,
//   },
//   google : {
//     id : String,
//     token : String,
//     email : String,
//     name : String,
//   },

//   privileges: String,
// });

User.prototype.generateHash = () => {
  return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
};

<<<<<<< HEAD
// checking if password is valid
User.prototype.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};
=======
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

// const User = mongoose.model('User', UserSchema);
>>>>>>> 8b6e022e021659df7efc8d75e97316e1173032c9

export default User;
