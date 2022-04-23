const express = require('express');
const router = express.Router();
const { catchAsyncErrors } = require('../middlewares/error');
const { authenticate } = require('../middlewares/authenticate');
const { find } = require('../controllers/userController');

//GET
router.get('/', authenticate, catchAsyncErrors(find));

module.exports = router;
