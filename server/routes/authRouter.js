import { Router } from 'express';
// import { authorization, login, logout, signin } from '../controllers/authController.js';
import { createNonce, logout, validate, verifyMessage } from '../controllers/authController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();

// router.use(catchAsyncErrors(auth));

// //GET
router.get('/nonce', catchAsyncErrors(createNonce));
router.get('/logout', catchAsyncErrors(logout));
// //POST
router.post('/verify', catchAsyncErrors(verifyMessage));
router.post('/validate', catchAsyncErrors(validate));
// router.post('/login', catchAsyncErrors(login));
// router.post('/signin', catchAsyncErrors(signin));
// router.post('/authorization', catchAsyncErrors(authorization));

export default router;
