// import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { authController } from '../controllers/authController';
import { catchAsyncErrors } from '../middlewares/handleError';

const authRouter = Router();

//GET
authRouter.get('/nonce', catchAsyncErrors(authController.createNonce));
// authRouter.get('/logout', verifyJWT, catchAsyncErrors(authController.logout));
// authRouter.get('/refresh', catchAsyncErrors(authController.refreshToken));
// authRouter.get(
//   '/refreshUserSession',
//   verifyJWT,
//   catchAsyncErrors(authController.refreshUserSession)
// );
//POST
authRouter.post('/verify', catchAsyncErrors(authController.login));
// authRouter.post('/validate', catchAsyncErrors(authController.validate));
authRouter.post('/signup', catchAsyncErrors(authController.signUp));

export { authRouter };
