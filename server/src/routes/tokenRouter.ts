import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';

const router = Router();
//GET

//TODO change to use find with queryParams
router.get('/', catchAsyncErrors(tokenController.find));
export default router;
