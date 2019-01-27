// /* tslint:disable:variable-name*/

// // import db from '../../../db';
// import bcrypt from 'bcrypt-nodejs';
// import sequelize from '../../../db/sequelize';
// import { UserSchema } from './old.user.schema';
// // import IUserPublic from '../interfaces/user.interface';

// const User = sequelize.define('user', UserSchema);

// // force: true will drop the table if it already exists
// // User.sync({force: true}).then(() => {
// //   // Table created
// //   return User.create({
// //     firstName: 'John',
// //     lastName: 'Hancock'
// //   });
// // });

// User.beforeCreate((user: IUserPublic ) => {
//   return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
// });

// User.prototype.update = function(id: number, user: IUserPublic ){
//   if(user.password) user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
//   User.where({ id })
//   .update(user);
// };

// User.prototype.generateHash = () => {
//   return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
// };

// // checking if password is valid
// User.prototype.validPassword = (password) => {
//   return bcrypt.compareSync(password, this.password);
// };

// export default User;
