import { Role } from '@tipdapp/database';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createApiError } from '../utils/error';

const verifyRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const allowed = req.user?.roles.map((role: Role) => allowedRoles.includes(role)).some((val: boolean) => val === true);

    !allowed && createApiError('Not allowed to uses role', StatusCodes.FORBIDDEN);

    next();
  };
};

export { verifyRoles };