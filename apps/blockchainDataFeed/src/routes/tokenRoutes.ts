import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';
const router = Router();

router.get('/', tokenController.tokens);
router.get('/:symbol', tokenController.token);

export default router;
