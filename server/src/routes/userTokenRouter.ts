import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { create, find } from '../controllers/userTokenController';

const router = Router();
//GET
router.get('/', catchAsyncErrors(find));

//POST
router.post('/', catchAsyncErrors(create));
export default router;
