import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';

const tokenRouter = Router();

tokenRouter.get('/', catchAsyncErrors(tokenController.findMany));
tokenRouter.get('/:symbol', catchAsyncErrors(tokenController.find));

export { tokenRouter };
