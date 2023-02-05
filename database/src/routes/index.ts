import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
// import authorizationRoutes from './authRouter';
import pageRoutes from './pageRouter';
import tipRoutes from './tipRouter';
import tokenRoutes from './tokenRouter';
import userRoutes from './userRouter';
import tipperRoutes from './tipperRouter';
import userTokenRoutes from './userTokenRouter';

const mainRouter = Router();

// mainRouter.use('/auth', authorizationRoutes);

//auth middleware added in pageRouter
mainRouter.use('/page', pageRoutes);

//auth middleware added in pageRouter
mainRouter.use('/user', userRoutes);

//auth middleware added in pageRouter
mainRouter.use('/tipper', tipperRoutes);

mainRouter.use('/tip', verifyJWT, tipRoutes);

mainRouter.use('/tokenInfo', tokenRoutes);

mainRouter.use('/userToken', verifyJWT, userTokenRoutes);

export { mainRouter};
