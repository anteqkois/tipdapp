const express = require('express');
const router = express.Router();
// const { catchAsyncErrors, createApiError } = require('../middlewares/errors');
const { authorization, login, logout, signin } = require('../controllers/authController');

//GET
router.post('/logout', logout);

//POST
router.post('/authorization', authorization);
router.post('/login', login);
router.post('/signin', signin);

module.exports = router;
