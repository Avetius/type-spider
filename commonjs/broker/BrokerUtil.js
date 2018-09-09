import { RMQBroker } from "./RMQBroker";

export class BrokerUtil {
    static _broker; //: IMessageBroker;

    static getBroker(){ // : IMessageBroker {
        if (this._broker == null) {
            this._broker = new RMQBroker();
        }
        return this._broker;
    }
}