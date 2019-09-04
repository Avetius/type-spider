import { queues } from './init';

export class Broker {
  async listen (queueName, cback) {
    queues[queueName].activateConsumer((message) => {
      const msg = message.getContent();
      return cback(msg)
    }, {noAck: true});
  }

  async send (queueName, message) {
    return queues[queueName].rpc(message).then((result) => {
      console.log(' From "users" queue got ', result.getContent());
      return result.getContent();
    });
  }
}

export default new Broker();
