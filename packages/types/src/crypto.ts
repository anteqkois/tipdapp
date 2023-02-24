type TokenCoinGecko = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: number;
  last_updated: Date;
};

// export type HandledNetworks = 'rinkeby' | 'localhost' | 'hardhat';
// export type HandledNetworks = 'mainnet' |'localhost' | 'hardhat';
type HandledNetworks = 'hardhat' 

type Address = `0x${string}`;

type Hash = `0x${string}`;

export type { TokenCoinGecko, HandledNetworks, Address, Hash };
