import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import authorizationRoutes from './authRouter';
import tipRoutes from './tipRouter';
import userRoutes from './userRouter';
import userTokenRoutes from './userTokenRouter';

const router = Router();

router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/tip', authenticate, tipRoutes);
// router.use('/tip', tipRoutes);
router.use('/userToken', userTokenRoutes);
export default router;
