"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqplib/callback_api");
const uuid = require("uuid");
var args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: rpc_client.js num");
    process.exit(1);
}
amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertQueue('', { exclusive: true }, function (err, q) {
            var corr = uuid.v4().toString();
            var num = parseInt(args[0]);
            console.log(' [x] Requesting fib(%d)', num);
            ch.consume(q.queue, function (msg) {
                if (!!msg && msg.properties.correlationId === corr) {
                    console.log(' [.] Got %s', msg.content.toString());
                    setTimeout(function () { conn.close(); process.exit(0); }, 500);
                }
            }, { noAck: true });
            ch.sendToQueue('rpc_queue', Buffer.alloc(num.toString().length, num.toString()), { correlationId: corr, replyTo: q.queue });
        });
    });
});
//# sourceMappingURL=rabbitmq-c.js.map