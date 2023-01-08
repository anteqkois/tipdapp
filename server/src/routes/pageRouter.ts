import { catchAsyncErrors } from '@middlewares/handleError';
import { verifyJWT } from '@middlewares/verifyJWT';
import { verifyRoles } from '@middlewares/verifyRoles';
import { Router } from 'express';
import { pageController } from '../controllers/pageController';
// import { findPage, updatePage } from '../controllers/userController';

const router = Router();
//GET
router.get(
  '/',
  // verifyJWT,
  catchAsyncErrors(pageController.findByNick)
);

//PUT
router.put(
  '/',
  verifyJWT,
  verifyRoles('streamer'),
  catchAsyncErrors(pageController.update)
);

//POST

export default router;
