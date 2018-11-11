import { Controller } from './test.controller';
import { Broker } from '../broker';

const controller = new Controller();
const broker = new Broker();

async function switchRoutes(message) {
  switch (message.header) {
    case 'create':
    const result = await controller.create(message.body);
    // console.log('result -> ', result);
    return result;
  }
}

broker.listen('users', switchRoutes);
