import { Router } from 'express';
import { findByAddress } from '../controllers/tipController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();
//GET
// router.get('/', authenticate, catchAsyncErrors(findByUseraddress));

//change to use find with queryParams
router.get('/', catchAsyncErrors(findByAddress));
export default router;
