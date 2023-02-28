import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { userController } from '../controllers/userController';

const userRouter = Router();

// GET
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore THERE IS WEIRD ERROR, ALL WORKS FINE, AND ONE MOMENT START THROW IT WITOUT REASON
userRouter.get('/:address/user-token', catchAsyncErrors(userController.findUserToken));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore THERE IS WEIRD ERROR, ALL WORKS FINE, AND ONE MOMENT START THROW IT WITOUT REASON
userRouter.get('/:address', catchAsyncErrors(userController.findByAddress));
userRouter.get('/', catchAsyncErrors(userController.find));

// POST

userRouter.post('/validate', catchAsyncErrors(userController.validate));
userRouter.post('/', catchAsyncErrors(userController.create));

export { userRouter };
