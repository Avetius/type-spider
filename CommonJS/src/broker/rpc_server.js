
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  if (err) console.log('err -> ', err);
  conn.createChannel(function(err, ch) {
    if (err) console.log('err -> ', err);
    var q = 'rpc_queue';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    ch.consume(q, function reply(msg) {
      var n = parseInt(msg.content.toString());

      console.log(" [.] fib(%d)", n);

      var r = fibonacci(n).toString();
      console.log('r -> ',r);
      ch.sendToQueue(msg.properties.replyTo, Buffer.from(r),
        {correlationId: msg.properties.correlationId});

      ch.ack(msg);
    });
  });
});

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}