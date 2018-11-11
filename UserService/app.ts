import { Broker } from '../CommonJS/src/broker/broker';
import { Controller } from './src/test_files/test.controller';
// import { authController } from './services/auth/controller';

const broker = new Broker();
const controller = new Controller();

async function actions(message) {
  let result;
  switch (message.header) {
    case 'getAll':
    result = await controller.getAll(message.body);  
    break;

    case 'getOne':
    result = await controller.getOne(message.body);
    break;

    case 'create':
    result = await controller.create(message.body);
    break;
    
    case 'update':
    result = await controller.update(message.body);
    break; 

    case 'delete':
    result = await controller.delete(message.body);
    break;
  }
  console.log('app.result -> ', result);
  return result;
}

broker.listen('users', actions);
