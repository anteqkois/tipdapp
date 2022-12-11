import { authenticate } from '@middlewares/authenticate';
import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { pageController } from '../controllers/pageController';
// import { findPage, updatePage } from '../controllers/userController';

const router = Router();
//GET
router.get('/', catchAsyncErrors(pageController.findByNick));

//PUT
router.put('/', catchAsyncErrors(pageController.update));
// router.put('/', authenticate, catchAsyncErrors(pageController.update));

//POST

export default router;
