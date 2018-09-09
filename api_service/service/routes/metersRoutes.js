/**
 * Created by sirius on 8/29/17.
 */
import { express }    from 'express';
import { meterCtrl }  from '../controllers/meterCtrl.js';
import { isUser, isAdmin, passport } from '../setup/auth.js';
import { validate }   from '../validation/validator.js';

const router = express.Router()

router
    .get('/electricity',   meterCtrl.action)
    .post('/electricity',  meterCtrl.action);

export default router;