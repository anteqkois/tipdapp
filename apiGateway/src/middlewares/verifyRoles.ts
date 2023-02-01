// import { Role } from '@prisma/client';
// import { NextFunction, Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { createApiError } from './error';

// export const verifyRoles = (...allowedRoles: Role[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const allowed = req.user?.roles
//       .map((role: Role) => allowedRoles.includes(role))
//       .some((val: boolean) => val === true);

//     !allowed &&
//       createApiError('Not allowed to uses role', StatusCodes.FORBIDDEN);

//     next();
//   };
// };

// // const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
// //   next();
// // };

// // export { verifyRoles };
