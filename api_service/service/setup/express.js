import { express }      from 'express';
import { morgan }       from 'morgan';                  // logger
import { bodyParser }   from 'body-parser';         // add req.body object to req
import { methodOverride } from 'method-override'; // simulate DELETE and PUT
import { compression }  from 'compression';        // compress req & res to gzip (increases speed and security)
import { helmet }       from 'helmet';
import { path }         from 'path';
import { routes }       from '../routes/index.js';
import { response }     from "../helpers/response.js";

const pubDir = path.join(__dirname , '../../public');
const app = express();

//================================ Configs =========================================================================================================
app.use(express.static(pubDir));// set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//================================ Helmet =========================================================================================================
app.use(helmet.xssFilter());
app.disable('x-powered-by');
//=============================== Add Headers ======================================================================================================
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');/*Website you wish to allow to connect*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); /*Request methods you wish to allow*/
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); /*Request headers you wish to allow*/
    res.setHeader('Access-Control-Allow-Credentials', true); /*Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)*/
    next(); /*Pass to next layer of middleware*/
});
//=============================== Add Routes ================================================================
// todo remove all routes and leave only 2 one for static file server 2nd for dynamic starting with /api
app.use('/api', routes);
app.get('/*', (req, res) => {
    res.sendFile(pubDir+'/index.html');
});
//==========================Routes for 404, 500===============================================================
// Assume 404 since no middleware responded
app.use((req, res) => {
    response(res, 404, {url: req.originalUrl, error: 'Page not found'},"Page not found");
});
app.use((err, req, res, next) => {
    if (!err) return next();
    console.error(err.stack);
    response(res, 500, {url: req.originalUrl, error: 'Internal Server Error'},"Internal Server Error");
});

export default app;