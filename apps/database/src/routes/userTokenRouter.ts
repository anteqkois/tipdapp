import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { userTokenController } from '../controllers/userTokenController';

const router = Router();
//GET
router.get('/', catchAsyncErrors(userTokenController.find));

//POST
router.post('/', catchAsyncErrors(userTokenController.create));
export default router;
