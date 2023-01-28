import { redis } from '../config/redis';
import { CONSTANTS } from '../constants';

const updateTokensDataInterval = async () => {};

const tokensFeed = async () => {
  const tokensData = await redis.hGetAll(CONSTANTS.REDIS.H_TOKEN_KEY);

  const parsedData: TokenCoinGecko[] = [];
  for (const [key, value] of Object.entries(tokensData)) {
    parsedData.push(JSON.parse(value));
  }

  return parsedData;
};

export const cryptocurrencyService = { tokensFeed };
