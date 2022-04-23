const express = require('express');
const router = express.Router();
const { catchAsyncErrors } = require('../middlewares/error');
const { authorization, login, logout, signin } = require('../controllers/authController');

//GET
router.get('/logout', catchAsyncErrors(logout));

//POST
router.post('/login', catchAsyncErrors(login));
router.post('/signin', catchAsyncErrors(signin));
router.post('/authorization', catchAsyncErrors(authorization));

module.exports = router;
