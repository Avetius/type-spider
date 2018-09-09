import { Queue, Message, Exchange } from "amqp-ts-async";
import { CommunicationCodes } from "./CommunicationCodes";
import { Thenable } from "bluebird";
import { IUser } from "../../../CoreService/src/components/users/interfaces/user.interface";

export interface IMessageBroker {
    sendRequest<Т>(code: CommunicationCodes, body: any, queueName: string, ip?: string, user?: Partial<IUser>): Thenable<Т>;
    sendToExchange(code: CommunicationCodes, body: any, exchangeName: string, ip?: string, user?: IUser): void;
    sendResponse(action: any, body: any, message: any, queueName: string): Thenable<Message>;
    sendError(error: any, body: string, correlationId: string, queueName: string): void;
    subscribe(queue: string, callback?: Function, exchange?: Exchange, ack?: boolean): void;
    init(): any;
    publishMessage(msg: string, queueName: string): void;
    publishMessageWithCode(ode: CommunicationCodes, body: any, queueName: string, user?: Partial<IUser>): void;
    declareQueue(name: string, options?: Queue.DeclarationOptions): Queue;
    declareExchange(name: string, type?: string, options?: Exchange.DeclarationOptions): Exchange;
    callbackQueue: string;
}