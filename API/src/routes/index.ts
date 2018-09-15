import { Router } from 'express';
import { userRoutes } from './users';
import { gateRoutes } from './gates';
import { lightRoutes } from './lights';
import { meterRoutes } from './meters';
import { barrierRoutes } from './barriers';

const router = Router();

router.use('/user', <Router>userRoutes);
router.use('/gate', <Router>gateRoutes);
router.use('/light', <Router>lightRoutes);
router.use('/meter', <Router>meterRoutes);
router.use('/barrier', <Router>barrierRoutes);

module.exports = router;