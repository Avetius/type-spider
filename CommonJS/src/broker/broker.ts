import * as amqp from 'amqp-ts';

const queueNames = {
    userService: 'userService',
    controllerService: 'controllerService',
}

export class Broker {
  private conn;
  private queues;
  private queueNames;

  constructor() {
    this.init();
    this.conn;
    this.queues;
    this.queueNames;
  }

  private async init() {
    this.conn = new amqp.Connection();
    Object.keys(this.queueNames).map(name => {
      this.queues = this.conn.declareQueue(name, {durable: false});
    });
  }

  public async send(name: string, msg){
    const validQueue = this.queues.filter(q => q === name);
    if (!validQueue) throw new Error('cannot find queue name');
    const response = this.queues.name.rpc(msg);
    console.log('response -> ', response);
    return response;
  }

  public async listen(name, factory){
    const validQueue = this.queues.filter(q => q === name);
    if (!validQueue) throw new Error('cannot find queue name');
    this.queues.name.activateConsumer((message) => {
        const msg = message.getContent();
        // return fibonacci number
        return factory(msg);
      }, {noAck: false});
  }
} 