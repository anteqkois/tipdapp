import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { tipController } from '../controllers/tipController';

const router = Router();
//GET
// router.get('/', verifyJWT, catchAsyncErrors(findByUseraddress));

//TODO change to use find with queryParams
router.get('/', catchAsyncErrors(tipController.findByAddress));
export default router;
