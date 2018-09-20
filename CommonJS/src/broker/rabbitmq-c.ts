
import * as amqp from'amqplib/callback_api';
import * as uuid from 'uuid';

let args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Usage: rpc_client.js num");
    process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
    if (err) {
        console.error('Error -> ', err);
    }

    conn.createChannel(function(err, ch) {
        if (err) {
            console.error('Error -> ', err);
        }
        console.log('client channel created');
        ch.assertQueue('asd', {exclusive: true}, function(err, q) {

            if (err) {
                console.error('Error -> ', err);
            }
            let corr = uuid.v4().toString(); //generateUuid();  uuid.v4().toString();
            let num = parseInt(args[0]);

            console.log(' [x] Requesting fib(%d)', num);

        ch.consume(q.queue, function(msg) {
            if (!!msg && msg.properties.correlationId === corr) {
                console.log(' [.] Got %s', msg.content.toString());
                setTimeout(function() { conn.close(); process.exit(0); }, 500);
            }
        }, {noAck: true});

        ch.sendToQueue('rpc_queue', Buffer.from(num.toString()),
            { correlationId: corr, replyTo: q.queue });
        });
    });
});

// function generateUuid() {
// return Math.random().toString() +
//     Math.random().toString() +
//     Math.random().toString();
// }