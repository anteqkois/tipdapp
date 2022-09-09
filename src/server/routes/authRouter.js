import { Router } from 'express';
// import { authorization, login, logout, signin } from '../controllers/authController.js';
import { auth } from '../controllers/authController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();

router.use(catchAsyncErrors(auth));

// //GET
// router.get('/logout', catchAsyncErrors(logout));
// //POST
// router.post('/login', catchAsyncErrors(login));
// router.post('/signin', catchAsyncErrors(signin));
// router.post('/authorization', catchAsyncErrors(authorization));

export default router;
