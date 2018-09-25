"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqplib/callback_api");
amqp.connect('amqp://localhost', function (err, conn) {
    if (err) {
        console.error('Error -> ', err);
    }
    conn.createChannel(function (err, ch) {
        if (err) {
            console.error('Error -> ', err);
        }
        console.log('server channel created');
        const q = 'rpc_queue';
        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        ch.consume(q, function reply(msg) {
            if (!!msg) {
                let n = parseInt(msg.content.toString());
                console.log(" [.] fib(%d)", n);
                let r = fibonacci(n);
                ch.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), { correlationId: msg.properties.correlationId });
                ch.ack(msg);
            }
        });
    });
});
function fibonacci(n) {
    if (n == 0 || n == 1)
        return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
//# sourceMappingURL=rabbitmq-p.js.map