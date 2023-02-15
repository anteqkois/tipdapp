import { Router } from 'express';
import { verifyJWT } from '../middlewares/verifyJWT';
import { pageRouter } from './pageRouter';
import { tipperRouter } from './tipperRouter';
import { tipRouter } from './tipRouter';
import { tokenRouter } from './tokenRouter';
import { userRouter } from './userRouter';
import { userTokenRouter } from './userTokenRouter';

const mainRouter = Router();

// auth middleware added in pageRouter
mainRouter.use('/page', pageRouter);

// auth middleware added in pageRouter
mainRouter.use('/user', userRouter);

// auth middleware added in pageRouter
mainRouter.use('/tipper', tipperRouter);

mainRouter.use('/tip', verifyJWT, tipRouter);

mainRouter.use('/tokenInfo', tokenRouter);

mainRouter.use('/userToken', verifyJWT, userTokenRouter);

export { mainRouter };
