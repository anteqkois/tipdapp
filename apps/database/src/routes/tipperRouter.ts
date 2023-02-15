import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { tipperController } from '../controllers/tipperController';

const tipperRouter = Router();

// GET
tipperRouter.get('/', catchAsyncErrors(tipperController.find));

// POST
tipperRouter.post('/', catchAsyncErrors(tipperController.create));

export { tipperRouter };
