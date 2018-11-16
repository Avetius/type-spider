"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
class Broker {
    async listen(queueName, cback) {
        init_1.queues[queueName].activateConsumer((message) => {
            const msg = message.getContent();
            return cback(msg);
        }, { noAck: true });
    }
    async send(queueName, message) {
        return init_1.queues[queueName].rpc(message).then((result) => {
            console.log(' From "users" queue got ', result.getContent());
            return result.getContent();
        });
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map