"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqplib/callback_api");
amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        const q = 'rpc_queue';
        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        ch.consume(q, function reply(msg) {
            if (!!msg) {
                var n = parseInt(msg.content.toString());
                console.log(" [.] fib(%d)", n);
                var r = fibonacci(n);
                ch.sendToQueue(msg.properties.replyTo, Buffer.alloc(r.toString().length, r.toString()), { correlationId: msg.properties.correlationId });
                ch.ack(msg);
            }
        });
    });
});
function fibonacci(n) {
    if (n == 0 || n == 1)
        return n;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}
//# sourceMappingURL=rabbitmq-p.js.map