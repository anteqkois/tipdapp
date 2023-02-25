import { catchAsyncErrors } from '@tipdapp/server';
import { Router } from 'express';
import { tipController } from '../controllers/tipController';

const tipRouter = Router();

// TODO change to use find with queryParams?
// GET
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore THERE IS WEIRD ERROR, ALL WORKS FINE, AND ONE MOMENT START THROW IT WITOUT REASON
tipRouter.get('/', catchAsyncErrors(tipController.findByAddress));

export { tipRouter };
