import { api } from '../config/apiConfig';
import handledTokens from '../config/handledTokens.json';
import { CONSTANTS, redis } from '../config/redis';

class TokenFeed {
  isRunning = false;

  intervalId: NodeJS.Timer | undefined;

  tokensIds = handledTokens.map((token) => token.coinGeckoId).join();

  async fetchTokensData() {
    return api.get<unknown, TokenCoinGecko[]>('/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: this.tokensIds,
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
  }

  async updateTokenData() {
    const tokens = await this.fetchTokensData();

    const mappedTokens: Record<string, string> = {};
    // 'for of' was used to get better performance than reduce method
    for (const token of tokens) {
      mappedTokens[token.id] = JSON.stringify(token);
    }

    await redis.hSet(CONSTANTS.KEY_HASH_TOKEN, mappedTokens);
    // this.setTokenData(tokens);
    console.log('> Token data were update');
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

export { TokenFeed };
