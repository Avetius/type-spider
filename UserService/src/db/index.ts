import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/userService');
export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function() {
  console.log('Mongo connected');
});
