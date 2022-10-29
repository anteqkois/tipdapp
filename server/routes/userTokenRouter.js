import { Router } from 'express';
import { create, find } from '../controllers/userTokenController.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();
//GET
router.get('/', catchAsyncErrors(find));

//POST
router.post('/', catchAsyncErrors(create));
export default router;
