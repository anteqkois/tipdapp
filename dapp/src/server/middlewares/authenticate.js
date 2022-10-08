// import { createApiError } from "./error.js";
// import jwt from "jsonwebtoken";

// const authenticate = (req, res, next) => {
//     const { JWT } = req.cookies;
//     if (JWT == null || JWT == undefined)
//         createApiError(`You are not authorized.`, 401);
//     jwt.verify(JWT, process.env.JWT_TOKEN_SECRET, (err, user) => {
//         if (err)
//             createApiError(`Wrong authentication token.`, 403);
//         req.user = user;
//         next();
//     });
// };

// export { authenticate };
// export default {
//     authenticate
// };
