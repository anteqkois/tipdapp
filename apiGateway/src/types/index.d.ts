export type TokenCoinGecko = {
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
  roi: any;
  last_updated: Date;
};

export type PartialExcept<T, U extends string[]> = {
  [K in keyof T as K extends U[number] ? K : never]?: T[K];
} & {
  [K in keyof T as K extends U[number] ? never : K]: T[K];
};

export type ModifyObjectKey<T, R> = Omit<T, keyof R> & R;

export type DecodedUser = Pick<User, 'address' | 'nick' | 'roles' | 'activeRole'> & { ip: string };