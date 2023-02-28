import { TokenCoinGecko } from '@tipdapp/types';
import { CONSTANTS, redis } from '../config/redis';

const getTokens = async (ids?: string[]) => {
  const parsedData: TokenCoinGecko[] = [];

  if (ids) {
    // const coingeckoIds = handledTokens
    //   .filter((token) => symbols.includes(token.symbol))
    //   .map((token) => token.coinGeckoId);
    (await redis.hmGet(CONSTANTS.KEY_HASH_TOKEN, ids)).forEach((rawData) =>
      parsedData.push(JSON.parse(rawData))
    );
  } else {
    const tokensData = await redis.hGetAll(CONSTANTS.KEY_HASH_TOKEN);
    for (const [, value] of Object.entries(tokensData)) {
      parsedData.push(JSON.parse(value));
    }
  }

  return parsedData;
};

const getToken = async (id: string): Promise<TokenCoinGecko | null> => {
  // const coingeckoId = handledTokens.find(
  //   (token) => token.symbol === symbol
  // )?.coinGeckoId;

  if (id) {
    const rawData = await redis.hGet(CONSTANTS.KEY_HASH_TOKEN, id);
    if (rawData) return JSON.parse(rawData);
  }
  return null;
};

export const tokenService = { getTokens, getToken };
