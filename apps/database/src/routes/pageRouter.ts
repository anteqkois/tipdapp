import { verifyJWT } from '@middlewares/verifyJWT';
import { verifyRoles } from '@middlewares/verifyRoles';
import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { pageController } from '../controllers/pageController';
// import { findPage, updatePage } from '../controllers/userController';

const pageRouter = Router();
// GET
pageRouter.get(
  '/:role/:affixUrl',
  // verifyJWT,
  catchAsyncErrors(pageController.findByAffixUrl)
);

// PUT
pageRouter.put(
  '/',
  // verifyJWT,
  // verifyRoles('streamer'),
  catchAsyncErrors(pageController.update)
);

export { pageRouter };
