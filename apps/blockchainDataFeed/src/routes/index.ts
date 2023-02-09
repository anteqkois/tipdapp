import { Router } from 'express';
import tokenRoutes from './tokenRoutes';

const router = Router();

router.use('/token', tokenRoutes);

export default router;
