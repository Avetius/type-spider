import * as amqp from 'amqp-ts';

interface Iqueue {
  name: string;
  conn: any;
}

const queueNames = {
  users: 'users',
  controllers: 'controllers',
}

export class Broker {
  public conn;
  public queues: Iqueue[];
  public queueNames;
  private validQueue;

  constructor() {
    this.conn;
    this.queues;
    this.queueNames = queueNames;
  }

  private async init(name) {
    this.conn = new amqp.Connection();
    this.queues = await Object.keys(this.queueNames).map(name => {
      return {
        name: name,
        conn: this.conn.declareQueue(name, {durable: false})
      }
    });
    const [queue] = await this.queues.filter(q => {
      if (q.name === name) return q.conn
    });
    if (!queue) {
      console.error(`cannot find queue name -> ${name}`);
      process.exit(1);
    }
    this.validQueue = queue.conn;
  }

  public async send(name: string, msg){
    await this.init(name);
    const response = await this.validQueue.rpc(msg);
    return response;
  }

  public async listen(name, factory){
    await this.init(name);
    console.log('queue -> ', this.validQueue);
    this.validQueue.activateConsumer(async(message) => {
        const msg = message.getContent();
        // return fibonacci number
        return await factory(msg);
      }, {noAck: true});
  }
} 