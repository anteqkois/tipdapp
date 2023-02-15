import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { userTokenController } from '../controllers/userTokenController';

const userTokenRouter = Router();

// GET
userTokenRouter.get('/', catchAsyncErrors(userTokenController.find));

// POST
userTokenRouter.post('/', catchAsyncErrors(userTokenController.create));

export { userTokenRouter };
