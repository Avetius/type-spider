import { Controller } from '../test.controller';
import { Broker } from '../broker';

const controller = new Controller();
const broker = new Broker();

class Routes {
  public async switch(message) {
    switch (message.header) {
      case 'create':
      const result = await controller.create(message.body);
      // console.log('result -> ', result);
      return result;
    }
  }
}

const routes = new Routes();
broker.listen('users', routes.switch);
