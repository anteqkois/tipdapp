import { Router } from 'express';
import { logRequest } from '../middlewares/logRequest.js';
import authorizationRoutes from './authRouter.js';
import tipRoutes from './tipRouter.js';
import userRoutes from './userRouter.js';
import userTokenRoutes from './userTokenRouter.js';

const router = Router();

router.use('*', logRequest);

router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/tip', tipRoutes);
router.use('/userToken', userTokenRoutes);
export default router;