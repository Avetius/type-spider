import { Router, Request, Response } from 'express';
import lightCtrl from '../controllers/lightCtrl.js';
import { isAdmin, isUser, isLoggedIn } from '../middleware/userRoles';

import validate from '../validation/validator.js';

const router = Router();

router
    .post('/entrance/:number',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCtrl'),*/ lightCtrl.action);

export const lightRoutes: Router = router;