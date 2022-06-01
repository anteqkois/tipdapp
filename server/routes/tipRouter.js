const express = require('express');
const router = express.Router();
const { catchAsyncErrors } = require('../middlewares/error');
const { authenticate } = require('../middlewares/authenticate');
const { findByUserWalletAddress } = require('../controllers/tipController');

//GET
// router.get('/', authenticate, catchAsyncErrors(findByUserWalletAddress));
router.get('/walletAddress/:walletAddress', catchAsyncErrors(findByUserWalletAddress));
// router.get('/', (req, res) => {
//   console.log(req.query);
// });

module.exports = router;
