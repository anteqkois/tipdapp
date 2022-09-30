import { Router } from 'express';
import { create, findByAddress } from '../controllers/tokenController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();
//GET
router.get('/', catchAsyncErrors(findByAddress));

//POST
router.post('/', catchAsyncErrors(create));
export default router;
