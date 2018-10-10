"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqp-ts");
class Broker {
    init() {
        const conn = new amqp.Connection();
        const exchange = conn.declareExchange("ServiceExchange");
        const queue1 = conn.declareQueue('users', { durable: true });
        queue1.bind(exchange);
        const queue2 = conn.declareQueue('controllers', { durable: true });
        queue2.bind(exchange);
        return [queue1, queue2];
    }
    async getQueue(name) {
        const queues = this.init();
        return queues[0];
    }
    async send(name, msg) {
        const validQueue = await this.getQueue(name);
        return validQueue.rpc(msg).then((result) => {
            console.log(' [.] Got ', result.getContent());
            return result.getContent();
        }).catch((e) => console.log('e -> ', e));
    }
    async listen(name, factory) {
        const validQueue = await this.getQueue(name);
        console.log('queue -> ', validQueue);
        validQueue.activateConsumer(async (message) => {
            const msg = message.getContent();
            const result = { result: msg };
            console.log('broker result -> ', result);
            return result;
        }, { noAck: true });
    }
}
exports.broker = new Broker();
//# sourceMappingURL=broker.js.map