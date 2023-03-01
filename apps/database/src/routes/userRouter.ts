import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { userController } from '../controllers/userController';

const userRouter = Router();

// GET
userRouter.get(
  '/:address/user-token',
  catchAsyncErrors(userController.findUserToken)
);
userRouter.get('/:address', catchAsyncErrors(userController.findByAddress));
userRouter.get('/', catchAsyncErrors(userController.find));

// POST

userRouter.post('/validate', catchAsyncErrors(userController.validate));
userRouter.post('/', catchAsyncErrors(userController.create));

export { userRouter };
