// import { Queue, Message, Exchange } from "amqp-ts-async";
// import { CommunicationCodes } from "./CommunicationCodes";
// import { Thenable } from "bluebird";
// import { IUser } from "../../../CoreService/src/components/users/interfaces/user.interface";

// export interface IMessageBroker {
//     // tslint:disable-next-line:no-any
//     sendRequest<Т>(code: CommunicationCodes, body: any, queueName: string, ip?: string, user?: Partial<IUser>): Thenable<Т>;
//     // tslint:disable-next-line:no-any
//     sendToExchange(code: CommunicationCodes, body: any, exchangeName: string, ip?: string, user?: IUser): void;
//     // tslint:disable-next-line:no-any
//     sendResponse(action: any, body: any, message: any, queueName: string): Thenable<Message>;
//     // tslint:disable-next-line:no-any
//     sendError(error: any, body: string, correlationId: string, queueName: string): void;
//     subscribe(queue: string, callback?: Function, exchange?: Exchange, ack?: boolean): void;
//     // tslint:disable-next-line:no-any
//     init(): any;
//     publishMessage(msg: string, queueName: string): void;
//     // tslint:disable-next-line:no-any
//     publishMessageWithCode(ode: CommunicationCodes, body: any, queueName: string, user?: Partial<IUser>): void;
//     declareQueue(name: string, options?: Queue.DeclarationOptions): Queue;
//     declareExchange(name: string, type?: string, options?: Exchange.DeclarationOptions): Exchange;
//     callbackQueue: string;
// }