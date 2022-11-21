import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import authorizationRoutes from './authRouter';
import tipRoutes from './tipRouter.js';
import userRoutes from './userRouter.js';
import userTokenRoutes from './userTokenRouter.js';

const router = Router();

router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/tip', authenticate, tipRoutes);
// router.use('/tip', tipRoutes);
router.use('/userToken', userTokenRoutes);
export default router;
