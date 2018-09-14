import { express }  from 'express';
import { user } from './users';
import { gateRoutes } from './gatesRoutes.js';
import { lightRoutes } from './lightsRoutes.js';
import { meterRoutes } from './metersRoutes.js';
import { barrierRoutes } from './barriersRoutes.js';

const router = express.Router();

router.use('/user', user);
router.use('/gate', gateRoutes);
router.use('/light', lightRoutes);
router.use('/meter', meterRoutes);
router.use('/barrier', barrierRoutes);

module.exports = router;