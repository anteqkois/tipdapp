import { Router } from 'express';
import { authorization, login, logout, signin } from '../controllers/authController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();
//GET
router.get('/logout', catchAsyncErrors(logout));
//POST
router.post('/login', catchAsyncErrors(login));
router.post('/signin', catchAsyncErrors(signin));
router.post('/authorization', catchAsyncErrors(authorization));

export default router;
