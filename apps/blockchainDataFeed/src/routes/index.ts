import { Router } from 'express';
import { tokenRouter } from './tokenRoutes';

const mainRouter = Router();

mainRouter.use('/token', tokenRouter);

export { mainRouter };
