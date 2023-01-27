import { Router } from 'express';
import dataRoutes from './dataRoutes';

const router = Router();

router.use('/data', dataRoutes);

export default router;
