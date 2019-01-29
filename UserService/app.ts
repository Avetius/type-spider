import { Broker } from '../CommonJS/src/broker/broker';
import { UserController } from './src/services/user/controllers/user.controller';
// import * as db from './src/db';

// db.on('error', console.error.bind(console, 'Mongo connection error:'));

const broker = new Broker();
const userController = new UserController();

async function actions(message) {
  let result;
  switch (message.header) {
    // case 'getAll':
    // result = userController.getAll(message.body);
    // break;

    // case 'getOne':
    // result = userController.getOne(message.body);
    // break;

    // case 'create':
    // result = userController.create(message.body);
    // break;
    
    // case 'update':
    // result = userController.update(message.body);
    // break; 

    // case 'delete':
    // result = userController.delete(message.body);
    // break;

    // case 'signup':
    // result = await userController.signup(message.body);
    // console.log('in case result -> ', result);
    // break;

    // case 'login':
    // result = userController.login(message.body);
    // break;

    // case 'loginJWT':
    // result = userController.loginJWT(message.body);
    // break;

    // case 'loginFB':
    // result = userController.loginFB(message.body);
    // break;

    // case 'loginGoogle':
    // result = userController.loginGoogle(message.body);
    // break;

    // case 'deserializeUser':
    // result = userController.deserializeUser(message.body);
    // break;

    case 'login':
    result = userController.findOne(message.body);
    break;

    case 'RegisterUser':
    result = userController.create(message.body);
    break;
  }
  
  console.log('app.result -> ', result);
  return result;
}

broker.listen('users', actions);
console.log('listening to "users"');
