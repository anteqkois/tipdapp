import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { findByAddress } from '../controllers/tipController';

const router = Router();
//GET
// router.get('/', authenticate, catchAsyncErrors(findByUseraddress));

//change to use find with queryParams
router.get('/', catchAsyncErrors(findByAddress));
export default router;
