/**
 * Created by Georgi on 3/1/2017.
 */
import * as Amqp from "amqp-ts-async";
import { v4 } from "uuid";
import { IMessageBroker } from "./IMessageBroker";
import { CommunicationCodes } from "./CommunicationCodes";
import { Message, Queue, Exchange } from "amqp-ts-async";
import { IUser } from "../../../CoreService/src/components/users/interfaces/user.interface";

const CONF = require('../../../config/configuration.json');
const username = CONF.RabbitMQ.username;
const password = CONF.RabbitMQ.password;
const vhost = CONF.RabbitMQ.vhost;
const host = CONF.RabbitMQ.host;
const port = CONF.RabbitMQ.port;
const connectionString = "amqp://" + username + ":" + password + "@" + host + ":" + port + vhost;

const connection = new Amqp.Connection(connectionString);

export class RMQBroker {
    _requestPromise = {};

    async subscribe(queueName, callback, exchange, ack = true) {
        let queue = connection.declareQueue(queueName, { prefetch: 1000 });
        if (exchange) {
            await queue.bind(exchange);
        }
        queue.activateConsumer(async message => {
            const body = message.getContent();
            // if this is reply to early made request
            const correlationId = message.properties.correlationId;
            const def = this._requestPromise[correlationId];

            if (correlationId && def) {
                if (body.errorCode == 0) {
                    def.resolve(body.response);
                } else {
                    def.reject(body.response);
                }
                delete this._requestPromise[correlationId];
            } else {
                //if this is not reply
                if (callback == null) {
                    return new Message();
                } else {
                    const response = await this.sendResponse(callback, body, message, queueName);
                    if (ack) message.ack();
                    return response;
                }
            }
        }, { noAck: !ack });
    }

    callbackQueue;

    init() {
        return connection.completeConfiguration();
    }

    // tslint:disable-next-line:no-any
    sendToExchange(code, body, exchangeName, ip, user) {
        const message = new Message({ code: code, body: body, ip: ip, user: user });
        const exchange = connection.declareExchange(exchangeName, undefined, { noCreate: true });
        exchange.send(message);
    }

    // tslint:disable-next-line:no-any
    sendRequest(code, body, queueName, ip, user) {
        return new Promise((res, rej) => {
            const reqId = v4();
            this._requestPromise[reqId] = { resolve: res, reject: rej };

            const message = new Message({ code: code, body: body, ip: ip, user: user });
            message.properties.replyTo = this.callbackQueue;
            message.properties.correlationId = reqId;

            connection.declareQueue(queueName, { noCreate: true }).send(message);
        })
    }

    publishMessage(msg, queueName) {
        const message = new Message(msg);
        const queue = connection.declareQueue(queueName);
        queue.send(message);
    }

    publishMessageWithCode(code, body, queueName, user) {
        const message = new Message({ code: code, body: body, user: user });
        const queue = connection.declareQueue(queueName);
        queue.send(message);
    }

    declareQueue(name, options) {
        return connection.declareQueue(name, options);
    }

    declareExchange(name, type, options) {
        return connection.declareExchange(name, type, options);
    }

    async sendResponse(action, body, message, queueName) {
        const reply = await action(body).then(result => {
            const reply = {
                errorCode: 0,
                response: result
            };
            return reply;
        }, error => {
            const reply = {
                errorCode: -1,
                response: error.message
            };
            this.sendError(error, message.getContent(), queueName + "_exception");
            return reply;
        });
        const replyMessage = new Message(reply);
        replyMessage.properties.correlationId = message.properties.correlationId;
        return replyMessage;
    }

    sendError(error, body, queueName) {
        const errorMessage = new Message({
            exception: error.message,
            onMessage: body,
            to: queueName,
            date: new Date().toUTCString()
        });

        const queue = connection.declareQueue(queueName);
        queue.send(errorMessage);
    }
}