//import * as uuid from "uuid";
import 'dotenv/config';
import 'reflect-metadata';
import * as cors from 'cors';
import * as http from 'http';
import chalk from 'chalk';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from 'method-override';

import slack from './notifications/slack.bot';

class ExpressApp {
    private router;
    private urlPrefix;

    constructor() {
        this.router = express.Router();
        this.initBroker();
        this.app = express();
        this.config();
        this.routesConfig();
    }

    public app: express.Express;
    
    private config(): void {
        this.app.use(cors());
        this.app.use(helmet.xssFilter());
        this.app.disable('x-powered-by');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan('combined'));  
        this.app.use(methodOverride());
        this.app.use(function (_req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    private routesConfig(): void {
        this.router.get('/', (_req, res) => {
            res.json({ message: 'API works!' });
        });

        if (process.env.devMode === 'test') this.urlPrefix = '/testapi/v1';
        if (process.env.devMode === 'prod') this.urlPrefix = '/api/v1';
        this.app.use(this.urlPrefix, this.router);

        // Handle 404
        this.app.use(function error404(_req, res) {
        res.status(404).send({ message: 'Page not Found' });
        });

        // Handle 500
        this.app.use(async function error500(err, req, res, next) {
        try {
            let eCode = 500;
            if (err.code && err.code < 600) eCode = err.code;
            const errMessage = err.message ? err.message : 'server error';
            let userName = '';
            if (req.user) userName = req.user.firstname;
            console.log(chalk.redBright('############################'));
            console.log(chalk.redBright('app.js errMessage >>> ', errMessage));
            console.log(chalk.redBright('############################'));
            await slack.send(`@${userName} -> [${req.protocol}] - ${req.originalUrl} code: ${eCode}, message: ${errMessage.toString()}`);
            return res.status(eCode).send({ code: eCode, message: errMessage.toString() });
        } catch (e) {
            res.status(500).send({ code: 500, message: '500 server Error' });
            return next(e);
        }
        });
    }

    private async initBroker() {

    }
}

const app = new ExpressApp().app;

const { port } = process.env;

export default app;

const httpsServer = http.createServer(app); // https.createServer(credentials, app);
httpsServer.listen(port);
process.on('unhandledRejection', async (reason) => {
  await slack.send(`@Avet process unhandled rejection -> ${JSON.stringify(reason)}`);
  console.log('process unhandled rejection -> ', reason);
  process.exit(1);
});

process.on('uncaughtException', async (reason) => {
  const err = reason.toString();
  await slack.send(`@Avet process unhandled promise rejection -> ${err}`);
  console.log('process unhandled promise rejection -> ', reason.message);
  process.exit(1);
});

// ==================================
console.log(chalk.red('concierge_backend \t\t started'));
console.log(chalk.blue(`Port:\t\t\t\t ${port}`));
