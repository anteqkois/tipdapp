import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { tipController } from '../controllers/tipController';

const tipRouter = Router();

// TODO change to use find with queryParams?
// GET
tipRouter.get('/', catchAsyncErrors(tipController.findByAddress));

export { tipRouter };
