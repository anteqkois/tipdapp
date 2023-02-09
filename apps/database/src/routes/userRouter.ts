import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { userController } from '../controllers/userController';
// import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = Router();
//GET
router.get('/:nick', catchAsyncErrors(userController.findByNick));
router.get('/', catchAsyncErrors(userController.find));

//POST
router.post('/validate', catchAsyncErrors(userController.validate));
router.post('/', catchAsyncErrors(userController.create));
export default router;
