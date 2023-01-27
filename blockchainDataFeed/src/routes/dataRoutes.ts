import { Router } from 'express';
import { dataController } from '../controllers/dataController';
const router = Router();

router.get('/', dataController.tokensData);
router.get('/:token', dataController.tokenData);

export default router;
