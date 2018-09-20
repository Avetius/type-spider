import * as amqp from'amqp-ts';

const queueNames = {
    userService: 'userService',
    controllerService: 'controllerService',
}
export default class Broker {
  private conn;
  private queues;
  private queueNames;

  constructor() {
    this.init();
    this.queueNames = queueNames
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

  public async listen(name){
    const validQueue = this.queues.filter(q => q === name);
    if (!validQueue) throw new Error('cannot find queue name');
    this.queues.name.activateConsumer((message) => {
        const msg = message.getContent();
        const n = parseInt(msg.num);
        console.log(' [.] fib(' + n + ')');
      
        // return fibonacci number
        return fibonacci(n);
      }, {noAck: false});
  }
} 