import handledTokens from '../config/handledTokens.json';
import { CONSTANTS, redis } from '../config/redis';

const getTokens = async (symbols?: string[]) => {
  const parsedData: TokenCoinGecko[] = [];

  if (symbols) {
    const coingeckoIds = handledTokens.filter((token) => symbols.includes(token.symbol)).map((token) => token.coinGeckoId);
    (await redis.hmGet(CONSTANTS.KEY_HASH_TOKEN, coingeckoIds)).forEach((rawData) => parsedData.push(JSON.parse(rawData)));
  } else {
    const tokensData = await redis.hGetAll(CONSTANTS.KEY_HASH_TOKEN);
    for (const [, value] of Object.entries(tokensData)) {
      parsedData.push(JSON.parse(value));
    }
  }

  return parsedData;
};

const getToken = async (symbol: string): Promise<TokenCoinGecko | null> => {
  const coingeckoId = handledTokens.find((token) => token.symbol === symbol)?.coinGeckoId;

  if (coingeckoId) {
    const rawData = await redis.hGet(CONSTANTS.KEY_HASH_TOKEN, coingeckoId);
    if (rawData) return JSON.parse(rawData);
  }
  return null;
};

export const cryptocurrencyService = { getTokens, getToken };
