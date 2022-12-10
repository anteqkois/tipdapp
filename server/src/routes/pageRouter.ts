import { authenticate } from '@middlewares/authenticate';
import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { findByNick, update } from '../controllers/pageController';
// import { findPage, updatePage } from '../controllers/userController';

const router = Router();
//GET
router.get('/', catchAsyncErrors(findByNick));

//PUT
router.put('/', authenticate, catchAsyncErrors(update));

//POST

export default router;
