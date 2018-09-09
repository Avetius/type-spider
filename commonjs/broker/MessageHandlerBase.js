export class MessageHandlerBase {
    _broker;
    _handleMessage(message);//: IMessage): Promise<any>;
    
    constructor(broker, queueName, ack = true) {
        if (broker) {
            this._broker = broker;
        }
        if (queueName) {
            this._broker.subscribe(queueName, this._handleMessage, undefined, ack);
        }
    }
}