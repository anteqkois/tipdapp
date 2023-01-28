import { Router } from 'express';
import { dataController } from '../controllers/dataController';
const router = Router();

router.get('/', dataController.tokens);
router.get('/:token', dataController.token);

export default router;
