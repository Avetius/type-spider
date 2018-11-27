import { Broker } from '../../CommonJS/src/broker/broker';
import { authController } from './services/auth/controller';
const broker = new Broker();

class Routes {
  public async switch(message) {
    switch (message.header) {
      case 'auth':
        return await authController.auth(message.body);
      break; 

      case 'signin':
        return await authController.create(message.body);
      break;
      
      case 'signup':
        return await authController.auth(message.body);
      break; 
    }
  }
}

const routes = new Routes();
broker.listen('users', routes.switch);
