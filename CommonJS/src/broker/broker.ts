import { queues } from './init';
export class Broker {
  async listen (queueName, callback) {
    queues[queueName].activateConsumer(async (message) => {
      const msg = message.getContent();
      const cbPromise = callback(msg);
      const result = Promise.resolve(cbPromise);
      console.log('broker.result -> ', result)
      return result;
    }, {noAck: true});
  }
  async send (queueName, message) {
    return queues[queueName].rpc(message).then(async (result) => {
      console.log(' From "users" queue got ', await result.getContent());
      return await result.getContent();
    });
  }
}

