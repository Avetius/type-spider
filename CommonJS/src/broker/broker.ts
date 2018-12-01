import { queues } from './init';
import { resolve } from 'bluebird';
export class Broker {
  async listen (queueName, cback) {
    // console.log('typeof cback -> ', typeof cback);
    // console.log('cback', cback);
    queues[queueName].activateConsumer((message) => {
      const msg = message.getContent();
      return resolve(cback(msg));
      // .then((result) => {
      //   console.log('Broker result -> ', result);
      //   return result;
      // });
    }, {noAck: true});
  }

  async send (queueName, message) {
    return queues[queueName].rpc(message).then((result) => {
      console.log(' From "users" queue got ', result.getContent());
      return result.getContent();
    });
  }
}
