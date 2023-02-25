import { catchAsyncErrors, verifyJWT, verifyRoles } from '@tipdapp/server';
import { Router } from 'express';
import { pageController } from '../controllers/pageController';
// import { findPage, updatePage } from '../controllers/userController';

const pageRouter = Router();
// GET
pageRouter.get(
  '/:role/:affixUrl',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore THERE IS WEIRD ERROR, ALL WORKS FINE, AND ONE MOMENT START THROW IT WITOUT REASON
  catchAsyncErrors(pageController.findByAffixUrl)
);

// PUT
pageRouter.put(
  '/',
  verifyJWT,
  verifyRoles('streamer'),
  catchAsyncErrors(pageController.update)
);

export { pageRouter };
