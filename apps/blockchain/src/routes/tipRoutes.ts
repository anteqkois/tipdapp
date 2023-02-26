import { Router } from 'express';
import { tipController } from '../controllers/tipController';

const tipRouter = Router();

tipRouter.post('/signature', tipController.signature);

export { tipRouter };
