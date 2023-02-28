import { api } from '@tipdapp/api';
import { handledTokens } from '@tipdapp/constants';
import { TokenCoinGecko } from '@tipdapp/types';
import { CONSTANTS, redis } from '../config/redis';

class TokenFeedService {
  isRunning = false;

  intervalId: NodeJS.Timer | undefined;

  tokensIds = handledTokens.map((token) => token.coinGeckoId).join();

  async fetchTokensData() {
    return api.get<unknown, TokenCoinGecko[]>(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          ids: this.tokensIds,
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );
  }

  async updateTokenData() {
    try {
      const tokens = await this.fetchTokensData();
      const mappedTokens: Record<string, string> = {};
      // 'for of' was used to get better performance than reduce method
      for (const token of tokens) {
        mappedTokens[token.id] = JSON.stringify(token);
      }

      await redis.hSet(CONSTANTS.KEY_HASH_TOKEN, mappedTokens);
      console.log('> Token data were update');
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  async start() {
    if (this.isRunning) return;

    await this.updateTokenData();

    this.intervalId = setInterval(() => this.updateTokenData(), 2 * 60 * 1000);
    this.isRunning = true;
  }

  stop(): void {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }
}

export { TokenFeedService };
