const express = require('express');
// const { catchErrors } = require('../middlewares/error');
const router = express.Router();
const authorizationRoutes = require('./authRouter');
const userRoutes = require('./userRouter');
const tipRoutes = require('./tipRouter');

// router.use('/', (req, res) => {
//   console.log(req);
// });
router.use('/auth', authorizationRoutes);
router.use('/user', userRoutes);
router.use('/tip', tipRoutes);

module.exports = router;
