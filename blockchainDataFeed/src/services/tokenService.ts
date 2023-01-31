import handledTokens from '../config/handledTokens.json';
import { redis } from '../config/redis';
import { CONSTANTS } from '../constants';

const getTokens = async (symbols?: string[]) => {
  const parsedData: TokenCoinGecko[] = [];

  if (symbols) {
    const coingeckoIds = handledTokens.filter((token) => symbols.includes(token.symbol)).map((token) => token.coinGeckoId);
    (await redis.hmGet(CONSTANTS.REDIS.H_TOKEN_KEY, coingeckoIds)).forEach((rawData) => parsedData.push(JSON.parse(rawData)));
  } else {
    const tokensData = await redis.hGetAll(CONSTANTS.REDIS.H_TOKEN_KEY);
    for (const [key, value] of Object.entries(tokensData)) {
      parsedData.push(JSON.parse(value));
    }
  }

  return parsedData;
};

const getToken = async (symbol: string): Promise<TokenCoinGecko | null> => {
  const coingeckoId = handledTokens.find((token) => token.symbol === symbol)?.coinGeckoId;

  if (coingeckoId) {
    const rawData = await redis.hGet(CONSTANTS.REDIS.H_TOKEN_KEY, coingeckoId);
    if (rawData) return JSON.parse(rawData);
  }
  return null;
};

export const cryptocurrencyService = { getTokens, getToken };
