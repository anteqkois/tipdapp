import { Router } from 'express';
import { createNonce, logout, signUp, validate, verifyMessageAndLogin, refreshToken } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { catchAsyncErrors } from '../middlewares/error.js';

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
