const express = require('express');
// const { catchErrors } = require('../middlewares/error');
const router = express.Router();
const authorizationRoutes = require('./authRouter');
const userRoutes = require('./userRouter');

router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);

module.exports = router;
