import * as amqp from 'amqp-ts';

const connection = new amqp.Connection();
const exchange = connection.declareExchange("ServiceExchange");

const serviceNames = [
  'users',
  'controllers'
];

export class BrokerClass {
  private queuesP;

  constructor(){
    this.queuesP = serviceNames.map(name => {
      let queue = connection.declareQueue(name, {durable: false});
      queue.name = name;
      queue.bind(exchange);
    });
  }

  public async send(name, message) {
    const queues = await this.queuesP;
    console.log('queues -> ', queues);
    const queue = queues.filter(q => q.name === name);
    queue.rpc(message).then((result) => {
      console.log(' [.] Got from users ', result.getContent());
    });
  }

  public async listen(name) {
    const queues = await this.queuesP;
    console.log('queues -> ', queues);
    const queue = queues.filter(q => q.name === name);
    queue.activateConsumer((message) => {
      const msg = message.getContent();
      console.log('msg -> ', msg);
      return msg;
    }, {noAck: true});
  }

}

const broker = new BrokerClass();

export default broker;