import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';

const tokenRouter = Router();

tokenRouter.get('/', tokenController.findMany);
tokenRouter.get('/:symbol', tokenController.find);

export { tokenRouter };
