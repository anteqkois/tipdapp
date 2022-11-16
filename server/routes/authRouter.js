import { Router } from 'express';
import { createNonce, logout, signUp, validate, verifyMessageAndLogin } from '../controllers/authController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();

//GET
router.get('/nonce', catchAsyncErrors(createNonce));
router.get('/logout', catchAsyncErrors(logout));
//POST
router.post('/verify', catchAsyncErrors(verifyMessageAndLogin));
router.post('/validate', catchAsyncErrors(validate));
router.post('/signup', catchAsyncErrors(signUp));

export default router;
