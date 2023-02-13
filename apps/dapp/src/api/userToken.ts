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

type FindParams = {
  userAddress: string;
};

type FindResponse = {
  userToken: any;
};

// use get with queryParams
const find = async (queryParams: FindParams) =>
  api.get<never, FindResponse>('/userToken', {
    params: queryParams,
  });

export { find };
