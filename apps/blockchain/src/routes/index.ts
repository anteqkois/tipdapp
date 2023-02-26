import { Router } from 'express';
import { tipRouter } from './tipRoutes';
import { tokenRouter } from './tokenRoutes';

const mainRouter = Router();

mainRouter.use('/token', tokenRouter);

mainRouter.use('/tip', tipRouter);

export { mainRouter };
