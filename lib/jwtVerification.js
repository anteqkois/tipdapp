import jwt from 'jsonwebtoken';
import { ApiError } from 'next/dist/server/api-utils';

const jwtVerification = (JWT) =>
  jwt.verify(JWT, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) throw new ApiErrorrror(403, 'Wrong JWT token');
    return user;
  });
  
export default jwtVerification;
