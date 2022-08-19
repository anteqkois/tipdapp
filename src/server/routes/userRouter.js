import { Router } from 'express';
import { find } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { catchAsyncErrors } from '../middlewares/error.js';

const router = Router();
//GET
router.get('/', authenticate, catchAsyncErrors(find));
export default router;
