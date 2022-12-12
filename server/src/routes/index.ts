import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
import authorizationRoutes from './authRouter';
import pageRoutes from './pageRouter';
import tipRoutes from './tipRouter';
import userRoutes from './userRouter';
import userTokenRoutes from './userTokenRouter';

const router = Router();

router.use('/auth', authorizationRoutes);
//auth middleware added in pageRouter
router.use('/page', pageRoutes);
router.use('/user', verifyJWT, userRoutes);
router.use('/tip', verifyJWT, tipRoutes);
router.use('/userToken', verifyJWT, userTokenRoutes);
export default router;
