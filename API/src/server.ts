//import * as uuid from "uuid";
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from 'method-override';
//import { broker } from "../../CommonJS/src/base/base.model";
//import { QueueType } from "../../CommonJS/src/messaging/QueueType";

// tslint:disable-next-line:no-var-requires
//require('./components/passport/strategies/local.strategy');

//import { RoutesInitializer } from "./initializers/routes.initializer";
//import { MessageHandler } from "./messaging/MessageHandler";

class ExpressApp {
    constructor() {
        this.app = express();
        this.config();
        this.routesConfig();
        this.initBroker();
    }

    public app: express.Express;
    
    private config(): void {
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // catch 404 and forward to error handler
        this.app.use(morgan('combined'));  
        this.app.use(methodOverride());
        //=============================== Helmet ======================================================================================================
        //this.app.use(helmet.xframe());
        //this.app.use(helmet.nosniff());
        //this.app.use(helmet.ienoopen());
        //this.app.use(compression());
        this.app.use(helmet.xssFilter());
        this.app.disable('x-powered-by');
        this.app.use(function (err: any, _req: express.Request, _res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        this.app.use(function (_req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
            // Allow access to pagination total count for client code
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            next();
        });
    }

    private routesConfig(): void {
        const router = express.Router();
        router.get('/', (_req, res) => {
            res.json({ message: 'Hello World!' });
        });
        this.app.use('/', router);        
    }

    private async initBroker() {
        // await broker.init();
        // const queueName = QueueType.API_SERVICE;
        // setup queue for being able to reply to exactly this service requests
        // const callbackQueue = queueName + "-" + uuid.v4();
        // broker.declareQueue(callbackQueue, { autoDelete: true });
        // broker.callbackQueue = callbackQueue;
        // broker.subscribe(callbackQueue, undefined, undefined, false);
        // new MessageHandler(broker, queueName);
    }
}

export const app = new ExpressApp().app;
