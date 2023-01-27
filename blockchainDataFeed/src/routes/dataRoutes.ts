import { Router } from 'express';
import { dataController } from '../controllers/dataController';
const router = Router();

router.get('/:coin', dataController.coinData);

export default router;
