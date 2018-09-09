/**
 * Created by sirius on 7/12/17.
 */
import { express }   from 'express';
import { lightCtrl } from '../controllers/lightCtrl.js';
import { isUser, isAdmin, passport } from '../setup/auth.js';
import { validate }  from '../validation/validator.js';

const router = express.Router();

router
    .post('/entrance/:number',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCtrl'),*/ lightCtrl.action);

export default router;