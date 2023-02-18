import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { userController } from '../controllers/userController';

const userRouter = Router();

// GET
userRouter.get('/:nick', catchAsyncErrors(userController.findByNick));
userRouter.get('/', catchAsyncErrors(userController.find));

// POST

userRouter.post('/validate', catchAsyncErrors(userController.validate));
userRouter.post('/', catchAsyncErrors(userController.create));

export { userRouter };
