import { Controller } from './test.controller';
import { Broker } from './broker';

const controller = new Controller();
const broker = new Broker();

class Routes {
  public async switch(message) {
    switch (message.header) {
      case 'user':
      return controller.user(message.body)
    }
  }
}
const routes = new Routes();
broker.listen('user', routes);