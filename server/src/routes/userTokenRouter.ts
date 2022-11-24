import { Router } from 'express';
import { create, find } from '../controllers/userTokenController';
import { catchAsyncErrors } from '../middlewares/error';

const router = Router();
//GET
router.get('/', catchAsyncErrors(find));

//POST
router.post('/', catchAsyncErrors(create));
export default router;
