// import { IMessageBroker } from "./IMessageBroker";
// import { IMessage } from "./message.interface";

// export abstract class MessageHandlerBase {
//     private broker: IMessageBroker;

//     constructor(broker?: IMessageBroker, queueName?: string, ack: boolean = true) {
//         if (broker) {
//             this.broker = broker;
//         }
//         if (queueName) {
//             this.broker.subscribe(queueName, this.handleMessage, undefined, ack);
//         }
//     }

//     // tslint:disable-next-line:no-any
//     protected abstract handleMessage(message: IMessage): Promise<any>;
// }