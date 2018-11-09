"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
class Broker {
    listen(queueName, cb) {
        return init_1.queues[queueName].activateConsumer((message) => {
            const msg = message.getContent();
            return cb.switch(msg);
        }, { noAck: true });
    }
    send(queueName, message) {
        return init_1.queues[queueName].rpc(message).then(function (result) {
            console.log(' From "users" queue got ', result.getContent());
            return result.getContent();
        });
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map