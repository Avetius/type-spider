import { queues, connection } from './init';
export class Broker {
  listen (queueName, cb) {
    return queues[queueName].activateConsumer((message) => {
      var controllersMsg = message.getContent();
      console.log('controllersMsg -> ', controllersMsg);
      controllersMsg.sendBack = 'controllers'
      // return fibonacci number
      return controllersMsg;
    }, {noAck: true});
  }
  send (queueName, message) {
    return queues[queueName].rpc(message).then(function(result) {
      console.log(' From "users" queue got ', result.getContent());
      return result;
    });
  }
} 