import { catchAsyncErrors, verifyJWT, verifyRoles } from '@tipdapp/server';
import { Router } from 'express';
import { pageController } from '../controllers/pageController';

const pageRouter = Router();

// GET
pageRouter.get(
  '/:role/:affixUrl',
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
