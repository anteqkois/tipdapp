import { api } from './apiConfig';

// export const create = async (body) => {
//   await api.post('/userToken', {
//     body: {
//       // address:
//       symbol: body.symbol,
//       name: body.name,
//       chainId: body.chainId,
//       User: body.walletAddress,
//     },
//   });
// };

// use get with queryParams
export const find = async (queryParams) => {
  return await api.get('/userToken', { params: queryParams });
};
