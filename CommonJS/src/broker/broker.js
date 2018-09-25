"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqp-ts");
const queueNames = {
    users: 'users',
    controllers: 'controllers',
};
class Broker {
    constructor() {
        this.conn;
        this.queues;
        this.queueNames = queueNames;
    }
    async init(name) {
        this.conn = new amqp.Connection();
        this.queues = await Object.keys(this.queueNames).map(name => {
            return {
                name: name,
                conn: this.conn.declareQueue(name, { durable: false })
            };
        });
        const [queue] = await this.queues.filter(q => {
            if (q.name === name)
                return q.conn;
        });
        if (!queue) {
            console.error(`cannot find queue name -> ${name}`);
            process.exit(1);
        }
        this.validQueue = queue.conn;
    }
    async send(name, msg) {
        await this.init(name);
        const response = await this.validQueue.rpc(msg);
        return response;
    }
    async listen(name, factory) {
        await this.init(name);
        console.log('queue -> ', this.validQueue);
        this.validQueue.activateConsumer(async (message) => {
            const msg = message.getContent();
            const result = await factory(msg);
            console.log('broker result -> ', result);
            return result;
        }, { noAck: true });
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map