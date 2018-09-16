var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
  console.log('err -> ', err);
  conn.createChannel(function(err, ch) {
    console.log('err -> ', err);
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, Buffer.from('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
