import { Router, Request, Response } from 'express';
import meterCtrl from '../controllers/meterCtrl.js';
import { isAdmin, isUser, isLoggedIn } from '../middleware/userRoles';

import validate from '../validation/validator.js';

const router = Router();

router
    .get('/electricity',   meterCtrl.action)
    .post('/electricity',  meterCtrl.action);

export const meterRoutes: Router = router;