"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqp-ts");
const connection = new amqp.Connection();
const queue = connection.declareQueue('rpc_queue', { durable: true });
console.log('queue -> ', queue);
queue.activateConsumer((message) => {
    const msg = message.getContent();
    const n = parseInt(msg.num);
    console.log(' [.] fib(' + n + ')');
    return fibonacci(n);
}, { noAck: true });
function fibonacci(n) {
    if (n == 0 || n == 1)
        return n;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}
//# sourceMappingURL=amqp.server.js.map