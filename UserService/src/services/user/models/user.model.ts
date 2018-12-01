/* tslint:disable:variable-name*/
import * as bcrypt from 'bcrypt-nodejs';
import { sequelize } from '../../db';
import { UserSchema } from './user.schema';

const User = sequelize.define('User', UserSchema);

User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password);
  return user;
});

User.prototype.generateHash = () => {
  return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
};

// checking if password is valid
User.prototype.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

export default User;
