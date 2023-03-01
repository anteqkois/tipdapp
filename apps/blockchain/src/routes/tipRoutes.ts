import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { tipController } from '../controllers/tipController';

const tipRouter = Router();

tipRouter.post('/signature', catchAsyncErrors(tipController.signature));

export { tipRouter };
