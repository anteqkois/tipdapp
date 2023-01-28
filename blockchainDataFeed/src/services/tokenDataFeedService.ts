import api from '../config/apiConfig';
import handledTokens from '../config/handledTokens.json';
import { redis } from '../config/redis';
import { CONSTANTS } from '../constants';

class TokenFeed {
  isRunning = false;
  intervalId: NodeJS.Timer | undefined;
  tokensIds = handledTokens.map((token) => token.coingeckoIds).join();

  async fetchTokensData() {
    return api.get<{}, TokenCoinGecko[]>('/coins/markets', {
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

  async setTokenFeed(token: TokenCoinGecko) {
    redis.hSet(CONSTANTS.REDIS.H_TOKEN_KEY, token.id, JSON.stringify(token));
  }

  async subscribe() {
    if (this.isRunning) return;

    const tokens = await this.fetchTokensData();
    tokens.forEach(this.setTokenFeed);

    this.intervalId = setInterval(async () => {
      const tokens = await this.fetchTokensData();
      tokens.forEach(this.setTokenFeed);
    }, 20 * 1000);
    this.isRunning = true;

    console.log('> Token data were update');
  }

  unSubscribe(): void {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }
}

const tokenFeed = new TokenFeed();

export { tokenFeed };
