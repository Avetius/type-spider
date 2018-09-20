// import * as amqp from 'amqplib/callback_api';

// const REPLY_QUEUE = 'amq.rabbitmq.reply-to';
 
// const createClient = (settings) => amqp.connect(settings.url, settings.socketOptions)
//   .then((conn) => conn.createChannel())
//   .then((channel) => {
//     // create an event emitter where rpc responses will be published by correlationId
//     channel.responseEmitter = new EventEmitter();
//     channel.responseEmitter.setMaxListeners(0);
//     channel.consume(REPLY_QUEUE,
//       (msg) => channel.responseEmitter.emit(msg.properties.correlationId, msg.content),
//       {noAck: true});
 
//     return channel;
//   });
 
// const sendRPCMessage = (channel, message, rpcQueue) => new Promise((resolve) => {
//   const correlationId = uuid.v4();
//   // listen for the content emitted on the correlationId event
//   channel.responseEmitter.once(correlationId, resolve);
//   channel.sendToQueue(rpcQueue, new Buffer(message), { correlationId, replyTo: REPLY_QUEUE })
// });