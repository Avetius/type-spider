import * as amqp from 'amqp-ts';

// interface Iqueue {
//   name: string;
//   conn: any;
// }

// const queueNames = [
//   'controllers',
//   'users',
// ]

class Broker {
  // public conn;
  // public queues;
  // public queueNames;
  // private validQueue;
  // private exchange;

  // constructor() {
  //   this.conn;
  //   this.queues;
  //   this.exchange;
  //   this.queueNames = queueNames;
  //   this.init();
  // }

  public static init() {
    // this.conn = new amqp.Connection();
    // this.exchange = this.conn.declareExchange("ServiceExchange");

    // this.queues = this.conn.declareQueue('users', {durable: true});
    // this.queues.bind(this.exchange);
    const conn = new amqp.Connection();
    const exchange = conn.declareExchange("ServiceExchange");
    const queue1 = conn.declareQueue('users', {durable: true});
    queue1.bind(exchange);
    const queue2 = conn.declareQueue('controllers', {durable: true});
    queue2.bind(exchange);
    return [queue1, queue2]
    // this.queues = this.queueNames.map(async name => {
    //   const queue = this.conn.declareQueue(name, {durable: true})
    //   queue.bind(this.exchange);
    //   return queue;
    // });
  }

  public static async getQueue(name:string){
    // const [queue] = await this.queues.filter(async q => {
    //   console.log('q -> ', await q);
    //   if (await q._name === name) return await q
    // });
    // if (!queue) {
    //   console.error(`cannot find queue name -> ${name}`);
    //   return undefined;
    // }
    // return queue;
    const queues = this.init();
    return queues[0];
  }

  public static async send(name: string, msg){
    const validQueue = await this.getQueue(name);
    return validQueue.rpc(msg).then((result) => {
      console.log(' [.] Got ', result.getContent());
      return result.getContent();
    }).catch((e) => console.log('e -> ', e));
  }

  public static async listen(name, factory){
    const validQueue = await this.getQueue(name);
    console.log('queue -> ', validQueue);
    validQueue.activateConsumer(async(message) => {
        const msg = message.getContent();
        const result = {result: msg} //await factory(msg);
        console.log('broker result -> ', result);
        return result;
      }, {noAck: true});
  }
} 

export const broker = new Broker();
