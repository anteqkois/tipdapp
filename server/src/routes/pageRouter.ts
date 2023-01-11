import { catchAsyncErrors } from '@middlewares/handleError';
import { Router } from 'express';
import { pageController } from '../controllers/pageController';
// import { findPage, updatePage } from '../controllers/userController';

const router = Router();
//GET
router.get(
  '/:role/:affixUrl',
  // verifyJWT,
  catchAsyncErrors(pageController.findByAffixUrl)
);

//PUT
// router.put(
//   '/',
//   verifyJWT,
//   verifyRoles('streamer'),
//   catchAsyncErrors(pageController.update)
// );

//POST

export default router;
