import { api } from './apiConfig';

export const create = async (body) => {
  await api.post('/user-token', {
    body: {
      // address:
      symbol: body.symbol,
      name: body.name,
      chainId: body.chainId,
      User: body.walletAddress,
    },
  });
};
