import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { tipperController } from '../controllers/tipperController';

const router = Router();
//GET
router.get('/', catchAsyncErrors(tipperController.find));

//POST
router.post('/', catchAsyncErrors(tipperController.create));

export default router;
