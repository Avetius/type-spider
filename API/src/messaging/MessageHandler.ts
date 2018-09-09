// /**
//  * Created by Georgi on 3/1/2017.
//  */

// import { CommunicationCodes } from "../../../CommonJS/src/messaging/CommunicationCodes";
// import { MessageHandlerBase } from "../../../CommonJS/src/messaging/MessageHandlerBase";
// import { IMessage } from "../../../CommonJS/src/messaging/message.interface";

// export class MessageHandler extends MessageHandlerBase {
//     protected async handleMessage(message: IMessage): Promise<any> {
//         // const body = message.body;
//         switch (message.code) {
//             case CommunicationCodes.SEND_NOTIFICATION:
//                 console.log(message.body);
//                 return; //TODO send msg to socket.io
//         }
//     }
// }