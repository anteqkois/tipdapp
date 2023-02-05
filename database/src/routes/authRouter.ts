// import { catchAsyncErrors } from '@middlewares/handleError';
// import { Router } from 'express';
// import { authController } from '../controllers/authController';
// // import { verifyJWT } from '../middlewares/verifyJWT';

// const router = Router();

// // //GET
// // router.get('/nonce', catchAsyncErrors(authController.createNonce));
// // router.get('/logout', verifyJWT, catchAsyncErrors(authController.logout));
// // router.get('/refresh', catchAsyncErrors(authController.refreshToken));
// // router.get(
// //   '/refreshUserSession',
// //   verifyJWT,
// //   catchAsyncErrors(authController.refreshUserSession)
// // );
// // //POST
// // router.post('/verify', catchAsyncErrors(authController.verifyMessageAndLogin));
// router.post('/validate', catchAsyncErrors(authController.validate));
// // router.post('/signup', catchAsyncErrors(authController.signUp));

// // export default router;
