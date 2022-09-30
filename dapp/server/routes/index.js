import { Router } from 'express';
import authorizationRoutes from './authRouter.js';
import tipRoutes from './tipRouter.js';
import tokenRoutes from './tokenRouter.js';
import userRoutes from './userRouter.js';

const router = Router();

router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/tip', tipRoutes);
router.use('/token', tokenRoutes);
export default router;
