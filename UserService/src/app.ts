import { Broker } from '../../CommonJS/src/broker/broker';
import { authController } from './services/auth/controller';
const broker = new Broker();

class Routes {
  public async switch(message) {
    switch (message.header) {
      case 'create':
      return await authController.create(message.body);
      break;
      case '':
      return await 
    }
  }
}

const routes = new Routes();
broker.listen('users', routes.switch);
