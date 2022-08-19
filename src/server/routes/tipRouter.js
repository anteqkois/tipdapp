import { Router } from 'express';
import { findByUserWalletAddress } from '../controllers/tipController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();
//GET
// router.get('/', authenticate, catchAsyncErrors(findByUserWalletAddress));
router.get('/', catchAsyncErrors(findByUserWalletAddress));
export default router;
