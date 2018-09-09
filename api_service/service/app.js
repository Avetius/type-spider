import * as uuid from "uuid";
import { BrokerUtil } from "../../commonjs/broker/BrokerUtil";
import { MessageHandler } from "./messaging/MessageHandler";
import { QueueType } from "../../CommonJS/src/messaging/QueueType";
import { promise } from 'bluebird';


const broker = BrokerUtil.getBroker();

class Server {
    constructor() {
        this._initBroker();
        this._initDB();
    }

    async _initBroker() {
        await broker.init();
        let queueName = QueueType.MARKET_SERVICE;

        // setup queue for being able to reply to exactly this service requests
        let callbackQueue = queueName + "-" + uuid.v4();
        broker.declareQueue(callbackQueue, { autoDelete: true });
        broker.callbackQueue = callbackQueue;
        new MessageHandler(broker, callbackQueue, false);

        // get messages from message broker
        new MessageHandler(broker, queueName);
    }

    _initDB() {
        const CONF = require('../../config/configuration.json');
        const db = CONF.Databases.Market.postgres;
        const user = db.user;
        const password = db.password;
        const port = db.port;
        const host = db.host;
        const database = db.database;
        //BaseModel.db = pgp({ promiseLib: promise })('postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + database);
    }
}

new Server();