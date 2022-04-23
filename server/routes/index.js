const express = require('express');
// const { catchErrors } = require('../middlewares/error');
const router = express.Router();
const authorizationRoutes = require('./authRouter');

router.use('/auth', authorizationRoutes);

module.exports = router;
