import { queues } from './init';
export class Broker {
  listen (queueName, cb) {
    return queues[queueName].activateConsumer((message) => {
      var controllersMsg = message.getContent();
      controllersMsg.sendBack = 'controllers'
      return controllersMsg;
    }, {noAck: true});
  }
  send (queueName, message) {
    return queues[queueName].rpc(message).then(function(result) {
      console.log(' From "users" queue got ', result.getContent());
      return result.getContent();
    });
  }
}
