import { Router } from 'express';
import authorizationRoutes from './authRouter.js';
import tipRoutes from './tipRouter.js';
import userRoutes from './userRouter.js';

const router = Router();

router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/tip', tipRoutes);
export default router;
