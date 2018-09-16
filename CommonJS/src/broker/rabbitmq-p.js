"use strict";
exports.__esModule = true;
var amqp = require("amqplib/callback_api");
amqp.connect('amqp://localhost', function (err, conn) {
    if (err) {
        console.error('Error -> ', err);
    }
    conn.createChannel(function (err, ch) {
        if (err) {
            console.error('Error -> ', err);
        }
        console.log('server channel created');
        var q = 'rpc_queue';
        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        ch.consume(q, function reply(msg) {
            if (!!msg) {
                var n = parseInt(msg.content.toString());
                console.log(" [.] fib(%d)", n);
                var r = fibonacci(n);
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
