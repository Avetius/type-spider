// const createClient = (settings) => amqp.connect(settings.url, settings.socketOptions)
 
// const sendRPCMessage = (client, message, rpcQueue) => conn.createChannel()
//   .then((channel) => new Promise((resolve, reject) => {
//     const replyToQueue = 'amq.rabbitmq.reply-to';
//     const timeout = setTimeout(() => channel.close(), 10000);
 
//     const correlationId = uuid.v4();
//     const msgProperties = {
//       correlationId,
//       replyTo: replyToQueue
//     };
 
//     function consumeAndReply (msg) {
//       if (!msg) return reject(Error.create('consumer cancelled by rabbitmq'));
 
//       if (msg.properties.correlationId === correlationId) {
//         resolve(msg.content);
//         clearTimeout(timeout);
//         channel.close();
//       }
//     }
 
//     channel.consume(replyToQueue, consumeAndReply, {noAck: true})
//     .then(() => channel.sendToQueue(rpcQueue, new Buffer(content), msgProperties))
//   });