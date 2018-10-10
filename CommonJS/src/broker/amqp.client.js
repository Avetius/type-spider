"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqp-ts");
const connection = new amqp.Connection();
const exchange = connection.declareExchange("ServiceExchange");
const queue = connection.declareQueue('rpc_queue', { durable: true });
queue.bind(exchange);
console.log('q -> ', queue);
const args = process.argv.slice(2);
const service = args[0].toString;
const num = args[1];
const msg = {
    service,
    num,
};
console.log(' [x] Requesting fib(%d)', num);
queue.rpc(msg).then((result) => {
    console.log(' [.] Got ', result.getContent());
});
setTimeout(function () {
    connection.close();
}, 500);
//# sourceMappingURL=amqp.client.js.map