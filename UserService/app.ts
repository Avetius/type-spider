import { Broker } from '../CommonJS/src/broker/broker';
import { Controller } from './src/test_files/test.controller';
// import { authController } from './services/auth/controller';

const broker = new Broker();
const controller = new Controller();


class Routes {
  public async switch(message) {
    switch (message.header) {
      case 'getAll':
      return await controller.getAll(message.body);
      break;

      case 'getOne':
      return await controller.getOne(message.body);
      break;

      case 'create':
      return await controller.create(message.body);
      break;
      
      case 'update':
      return await controller.update(message.body);
      break; 

      case 'delete':
      return await controller.delete(message.body);
      break;
    }
  }
}

const routes = new Routes();
broker.listen('users', routes.switch);
