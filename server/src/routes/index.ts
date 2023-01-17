import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
import authorizationRoutes from './authRouter';
import pageRoutes from './pageRouter';
import tipRoutes from './tipRouter';
import tokenRoutes from './tokenRouter';
import userRoutes from './userRouter';
import userTokenRoutes from './userTokenRouter';

const router = Router();

router.use('/auth', authorizationRoutes);

//auth middleware added in pageRouter
router.use('/page', pageRoutes);

//auth middleware added in pageRouter
router.use('/user', userRoutes);

router.use('/tip', verifyJWT, tipRoutes);

router.use('/token', tokenRoutes);

router.use('/userToken', verifyJWT, userTokenRoutes);

export default router;
