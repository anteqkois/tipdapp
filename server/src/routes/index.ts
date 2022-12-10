import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import authorizationRoutes from './authRouter';
import pageRoutes from './pageRouter';
import tipRoutes from './tipRouter';
import userRoutes from './userRouter';
import userTokenRoutes from './userTokenRouter';

const router = Router();

router.use('/auth', authorizationRoutes);
//auth middleware added in pageRouter
router.use('/page', pageRoutes);
router.use('/user', authenticate, userRoutes);
router.use('/tip', authenticate, tipRoutes);
router.use('/userToken', authenticate, userTokenRoutes);
export default router;
