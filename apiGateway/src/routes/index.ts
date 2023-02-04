import { Router } from 'express';
// import { verifyJWT } from '../middlewares/verifyJWT';
import { authRouter } from './authRouter';

const router = Router();

router.use('/auth', authRouter);

export { router };
