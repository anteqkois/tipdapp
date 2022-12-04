import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import {
  createNonce,
  logout,
  refreshToken,
  signUp,
  validate,
  verifyMessageAndLogin,
} from '../controllers/authController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

//GET
router.get('/nonce', catchAsyncErrors(createNonce));
router.get('/logout', authenticate, catchAsyncErrors(logout));
router.get('/refresh', catchAsyncErrors(refreshToken));
//POST
router.post('/verify', catchAsyncErrors(verifyMessageAndLogin));
router.post('/validate', catchAsyncErrors(validate));
router.post('/signup', catchAsyncErrors(signUp));

export default router;
