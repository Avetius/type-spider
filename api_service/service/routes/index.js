/**
 * Created by sirius on 9/21/17.
 */
import { express }       from 'express';
import { userRoutes }    from './usersRoutes';
import { gateRoutes }    from './gatesRoutes';
import { lightRoutes }   from './lightsRoutes';
import { meterRoutes }   from './metersRoutes';
import { barrierRoutes } from './barriersRoutes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/gate', gateRoutes);
router.use('/light', lightRoutes);
router.use('/meter', meterRoutes);
router.use('/barrier', barrierRoutes);

export default router;