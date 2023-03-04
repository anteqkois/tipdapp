import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';

const tokenRouter = Router();

// GET
tokenRouter.get('/', catchAsyncErrors(tokenController.findMany));

export { tokenRouter };
