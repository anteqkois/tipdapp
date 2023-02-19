import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';

const tokenRouter = Router();

tokenRouter.get('/', tokenController.tokens);
tokenRouter.get('/:symbol', tokenController.token);

export { tokenRouter };
